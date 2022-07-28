export class FollicleMapFull {
  counts: {
    '24+': number[]
    '24': number[]
    '23': number[]
    '22': number[]
    '21': number[]
    '20': number[]
    '19': number[]
    '18': number[]
    '17': number[]
    '16': number[]
    '15': number[]
    '14': number[]
    '13': number[]
    '12': number[]
    '11': number[]
    '10': number[]
    '9': number[]
    '8': number[]
    '7': number[]
    '6': number[]
    '5': number[]
  }
  inRange: number

  constructor(follicleCount) {
    // Count follicles in range of 11-19mm
    this.inRange = 0
    this.counts = {
      '24+': [],
      '24': [],
      '23': [],
      '22': [],
      '21': [],
      '20': [],
      '19': [],
      '18': [],
      '17': [],
      '16': [],
      '15': [],
      '14': [],
      '13': [],
      '12': [],
      '11': [],
      '10': [],
      '9': [],
      '8': [],
      '7': [],
      '6': [],
      '5': [],
    }
    if (follicleCount) {
      follicleCount.forEach((follicle) => {
        if (follicle >= 11 && follicle <= 19) {
          this.inRange++
        }
        if (follicle > 24) {
          this.counts['24+'].push(0)
        } else if (follicle == 24) {
          this.counts['24'].push(0)
        } else if (follicle == 23) {
          this.counts['23'].push(0)
        } else if (follicle == 22) {
          this.counts['22'].push(0)
        } else if (follicle == 21) {
          this.counts['21'].push(0)
        } else if (follicle == 20) {
          this.counts['20'].push(0)
        } else if (follicle == 19) {
          this.counts['19'].push(0)
        } else if (follicle == 18) {
          this.counts['18'].push(0)
        } else if (follicle == 17) {
          this.counts['17'].push(0)
        } else if (follicle == 16) {
          this.counts['16'].push(0)
        } else if (follicle == 15) {
          this.counts['15'].push(0)
        } else if (follicle == 14) {
          this.counts['14'].push(0)
        } else if (follicle == 13) {
          this.counts['13'].push(0)
        } else if (follicle == 12) {
          this.counts['12'].push(0)
        } else if (follicle == 11) {
          this.counts['11'].push(0)
        } else if (follicle == 10) {
          this.counts['10'].push(0)
        } else if (follicle == 9) {
          this.counts['9'].push(0)
        } else if (follicle == 8) {
          this.counts['8'].push(0)
        } else if (follicle == 7) {
          this.counts['7'].push(0)
        } else if (follicle == 6) {
          this.counts['6'].push(0)
        } else if (follicle == 5) {
          this.counts['5'].push(0)
        }
      })
    }
  }
}
