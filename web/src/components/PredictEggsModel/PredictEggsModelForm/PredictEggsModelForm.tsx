import { useState } from 'react'

import { PickerDropPane } from 'filestack-react'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const PredictEggsModelForm = (props) => {
  const [modelUrl, setModelUrl] = useState(props?.modelUrl?.url)
  const [shardUrl, setShardUrl] = useState(props?.shardUrl?.url)

  const onSubmit = (data) => {
    props.onSave(data, props?.predictEggsModel?.id)
  }
  const onModelUpload = (response) => {
    setModelUrl(response.filesUploaded[0].url)
  }
  const onShardUpload = (response) => {
    setShardUrl(response.filesUploaded[0].url)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
        <Label
          name="modelUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Model
        </Label>
        <PickerDropPane
          apikey={process.env.FILESTACK_API_KEY}
          onSuccess={onModelUpload}
        />
        <Label
          name="modelUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Shard
        </Label>
        <PickerDropPane
          apikey={process.env.FILESTACK_API_KEY}
          onSuccess={onShardUpload}
        />

        <Label
          name="modelUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Model url
        </Label>

        <TextField
          name="modelUrl"
          value={modelUrl}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="modelUrl" className="rw-field-error" />

        <Label
          name="shardUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Shard url
        </Label>

        <TextField
          name="shardUrl"
          value={shardUrl}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="shardUrl" className="rw-field-error" />

        <Label
          name="imgUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Img url
        </Label>

        <TextField
          name="imgUrl"
          defaultValue={props.predictEggsModel?.imgUrl}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="imgUrl" className="rw-field-error" />

        <Label
          name="imgDesc"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Img desc
        </Label>

        <TextField
          name="imgDesc"
          defaultValue={props.predictEggsModel?.imgDesc}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="imgDesc" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.predictEggsModel?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <TextField
          name="userId"
          defaultValue={props.predictEggsModel?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="version"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Version
        </Label>

        <TextField
          name="version"
          defaultValue={props.predictEggsModel?.version}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="version" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PredictEggsModelForm
