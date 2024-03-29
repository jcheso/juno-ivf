import { Buffer } from 'buffer'

import { Fragment, useRef, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { Switch } from '@headlessui/react'
import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import CircleLoader from 'react-spinners/CircleLoader'
import { CreatePredictEggsModelInput } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  Label,
  FieldError,
  DateField,
  Submit,
  NumberField,
  FileField,
  TextAreaField,
  TextField,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from '../PredictEggs/PredictEggsCell'

export default function ModelDetails({
  open,
  setOpen,
  modelDetails,
  predictedEggs,
}) {
  const { hasRole, currentUser } = useAuth()
  const [enabled, setEnabled] = useState(false)
  const [shardFile, setShardFile] = useState(null)
  const [modelFile, setModelFile] = useState(null)
  const [imgFile, setImgFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const cancelButtonRef = useRef(null)
  // Initialise Firebase
  const credential = JSON.parse(
    Buffer.from(
      process.env.REDWOOD_ENV_GOOGLE_FIREBASE_CONFIG,
      'base64'
    ).toString()
  )
  const firebaseConfig = credential
  const app = initializeApp(firebaseConfig)
  const storage = getStorage(app)

  const CREATE_MODEL = gql`
    mutation CreatePredictEggsModel($input: CreatePredictEggsModelInput!) {
      createPredictEggsModel(input: $input) {
        id
        modelUrl
        shardUrl
        createdAt
        version
        description
      }
    }
  `

  const [createModel] = useMutation(CREATE_MODEL, {
    refetchQueries: [
      {
        query: QUERY,
        variables: {
          input: predictedEggs,
        },
      },
    ],
    awaitRefetchQueries: true,
    onError: () => {
      toast.error('Something went wrong, try again.')
    },
  })

  const onSubmit = async (data) => {
    setLoading(true)
    const shardFileRef = ref(storage, `v${data.version}/${shardFile.name}`)
    const modelFileRef = ref(storage, `v${data.version}/${modelFile.name}`)
    await uploadBytes(shardFileRef, shardFile)
    await uploadBytes(modelFileRef, modelFile)
    const modelUrl = await getDownloadURL(modelFileRef)
    const shardUrl = await getDownloadURL(shardFileRef)
    let imgUrl = null
    if (imgFile !== null) {
      const imgFileRef = ref(storage, `v${data.version}/${imgFile.name}`)
      await uploadBytes(imgFileRef, imgFile)
      imgUrl = await getDownloadURL(imgFileRef)
    }
    const createPredictEggsModelInput: CreatePredictEggsModelInput = {
      modelUrl: modelUrl,
      shardUrl: shardUrl,
      imgUrl: imgUrl,
      imgDesc: data.imgDesc,
      description: data.description,
      userId: currentUser.id,
      version: data.version,
    }
    await createModel({
      variables: { input: createPredictEggsModelInput },
    })
    toast.success(`Model updated to Version ${data.version} successfully!`)
    setOpen(false)
    setEnabled(false)
    setLoading(false)
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-5xl w-full sm:p-6">
                <Form className="space-y-6" onSubmit={onSubmit}>
                  <div className="px-4">
                    <div className="flex sm:flex-row flex-col">
                      <div className="md:col-span-1 w-4/5">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Model Details
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Upload a new model.
                        </p>
                      </div>
                      <div className="h-full align-bottom items-center mt-3 flex">
                        <Switch.Group as="div" className="flex items-center">
                          <Switch
                            checked={enabled}
                            onChange={() => {
                              if (hasRole('admin')) {
                                setEnabled(!enabled)
                              } else {
                                toast.error('Only admins can update the model!')
                              }
                            }}
                            className={classNames(
                              enabled ? 'bg-indigo-600' : 'bg-gray-200',
                              'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className={classNames(
                                enabled ? 'translate-x-5' : 'translate-x-0',
                                'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                              )}
                            />
                          </Switch>
                          <Switch.Label as="span" className="ml-3">
                            <span className="text-sm font-medium text-gray-900">
                              Edit Model
                            </span>
                          </Switch.Label>
                        </Switch.Group>
                      </div>
                    </div>
                    <div className="bg-white y-5 sm:rounded-lg ">
                      <div className="md:grid md:gap-6">
                        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:gap-x-4 sm:grid-cols-4">
                          <div className="sm:col-span-2">
                            <Label
                              name="version"
                              className="block text-sm font-medium text-gray-700"
                              errorClassName="block text-sm font-medium text-red-500"
                            >
                              Version
                            </Label>
                            <NumberField
                              name="version"
                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              errorClassName="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                              value={
                                enabled
                                  ? modelDetails.version + 1
                                  : modelDetails.version
                              }
                              validation={{
                                required: {
                                  value: true,
                                  message: 'Version is required',
                                },
                              }}
                              disabled={!enabled}
                            ></NumberField>
                          </div>
                          <div className="sm:col-span-2">
                            <Label
                              name="date"
                              className="block text-sm font-medium text-gray-700"
                              errorClassName="block text-sm font-medium text-red-500"
                            >
                              Date Added
                            </Label>
                            <DateField
                              name="date"
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              errorClassName="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              defaultValue={modelDetails.createdAt.substring(
                                0,
                                10
                              )}
                              disabled={!enabled}
                              validation={{
                                required: {
                                  value: true,
                                  message: 'Date Added is required',
                                },
                              }}
                            />
                            <FieldError
                              name="date"
                              className="block text-xs font-medium text-red-500 pt-1"
                            />
                          </div>
                        </div>
                        <div className="mt-6 sm:mt-0 sm:gap-x-6 grid sm:grid-cols-2 h-full">
                          <div className="h-full">
                            <Label
                              name="description"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Description
                            </Label>
                            <TextAreaField
                              rows={!enabled ? 15 : 6}
                              name="description"
                              id="description"
                              disabled={!enabled}
                              className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              defaultValue={modelDetails.description}
                              validation={{
                                required: {
                                  value: true,
                                  message: 'Description is required',
                                },
                              }}
                            />
                          </div>
                          <div>
                            {enabled ? (
                              <div className="space-y-3">
                                <div className="mt-6 sm:mt-0">
                                  <Label
                                    name="imgDesc"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Image Caption
                                  </Label>
                                  <TextField
                                    name="imgDesc"
                                    className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    defaultValue={modelDetails.imgDesc}
                                  />
                                </div>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                  {imgFile === null ? (
                                    <div className="space-y-1 text-center">
                                      <div className="flex text-sm text-gray-600">
                                        <Label
                                          name="imgUpload"
                                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                        >
                                          <span>Upload an image</span>
                                          <FileField
                                            id="imgUpload"
                                            disabled={!enabled}
                                            name="imgUpload"
                                            className="sr-only"
                                            onChange={(e) => {
                                              // check if the file type is image
                                              if (
                                                e.target.files[0].type.includes(
                                                  'image'
                                                )
                                              ) {
                                                setImgFile(e.target.files[0])
                                              } else {
                                                e.target.value = ''
                                                toast.error(
                                                  'Please upload an image file'
                                                )
                                              }
                                            }}
                                          />
                                        </Label>
                                      </div>
                                      <p className="text-xs text-gray-500">
                                        JPEG/PNG Format
                                      </p>
                                    </div>
                                  ) : (
                                    <div className="flex flex-col text-center space-y-1">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setImgFile(null)
                                        }}
                                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                      >
                                        {imgFile.name}
                                      </button>
                                      <p className="text-xs text-gray-500">
                                        {Math.round(imgFile.size / 1000)} kB
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="mt-6 sm:mt-0 h-full">
                                <h3 className="block text-sm font-medium text-gray-700">
                                  {modelDetails.imgDesc}
                                </h3>
                                <img
                                  src={modelDetails.imgUrl}
                                  alt="Model"
                                  className="mt-1 shadow-s block w-full sm:text-sm border-gray-300 rounded-md border-2"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:space-x-6 mt-3">
                      {enabled && (
                        <div>
                          <h3 className="block text-sm font-medium text-gray-700">
                            Model File
                          </h3>
                          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            {modelFile === null ? (
                              <div className="space-y-1 text-center">
                                <div className="flex text-sm text-gray-600">
                                  <Label
                                    name="modelUpload"
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                  >
                                    <span>Upload a file</span>
                                    <FileField
                                      id="modelUpload"
                                      disabled={!enabled}
                                      name="modelUpload"
                                      className="sr-only"
                                      onChange={(e) => {
                                        // check if the file type is JSON
                                        if (
                                          e.target.files[0].type ===
                                          'application/json'
                                        ) {
                                          setModelFile(e.target.files[0])
                                        } else {
                                          e.target.value = ''
                                          toast.error(
                                            'Please upload a JSON file'
                                          )
                                        }
                                      }}
                                      validation={{
                                        required: {
                                          value: true,
                                          message:
                                            'A Model JSON file is required',
                                        },
                                      }}
                                    />
                                  </Label>
                                </div>
                                <p className="text-xs text-gray-500">
                                  JSON Format
                                </p>
                              </div>
                            ) : (
                              <div className="flex flex-col text-center space-y-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setModelFile(null)
                                  }}
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                >
                                  {modelFile.name}
                                </button>
                                <p className="text-xs text-gray-500">
                                  {Math.round(modelFile.size / 1000)} kB{' '}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {enabled && (
                        <div className="mt-3 md:mt-0">
                          <h3 className="block text-sm font-medium text-gray-700">
                            Shard File
                          </h3>
                          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            {shardFile === null ? (
                              <div className="space-y-1 text-center">
                                <div className="flex text-sm text-gray-600">
                                  <Label
                                    name="shardUpload"
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                  >
                                    <span>Upload a file</span>

                                    <FileField
                                      id="shardUpload"
                                      disabled={!enabled}
                                      name="shardUpload"
                                      className="sr-only"
                                      onChange={(e) => {
                                        // check if the file type is bin
                                        if (
                                          e.target.files[0].type ===
                                          'application/octet-stream'
                                        ) {
                                          setShardFile(e.target.files[0])
                                        } else {
                                          e.target.value = ''
                                          toast.error(
                                            'Please upload a BIN file'
                                          )
                                        }
                                      }}
                                      validation={{
                                        required: {
                                          value: true,
                                          message:
                                            'A Model JSON file is required',
                                        },
                                      }}
                                    />
                                  </Label>
                                </div>
                                <p className="text-xs text-gray-500">
                                  BIN Format
                                </p>
                              </div>
                            ) : (
                              <div className="flex flex-col text-center space-y-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setShardFile(null)
                                  }}
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                >
                                  {shardFile.name}
                                </button>
                                <p className="text-xs text-gray-500">
                                  {Math.round(shardFile.size / 1000)} kB
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-2 sm:mt-3 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense px-4">
                    {!loading ? (
                      <Submit
                        disabled={loading || !enabled}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                      >
                        Update Model
                      </Submit>
                    ) : (
                      <div className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">
                        <CircleLoader
                          loading={loading}
                          color="#ffffff"
                          size={20}
                        />
                      </div>
                    )}

                    <button
                      type="button"
                      disabled={loading}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-1 sm:text-sm"
                      onClick={() => {
                        setModelFile(null)
                        setShardFile(null)
                        setImgFile(null)
                        setOpen(false)
                        setEnabled(false)
                      }}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
