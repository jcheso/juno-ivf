export class FollicleMap {
  counts: {
    '>19': number[]
    '18-19': number[]
    '16-17': number[]
    '14-15': number[]
    '11-13': number[]
    '<11': number[]
  }

  constructor(follicleCount) {
    this.counts = {
      '>19': [],
      '18-19': [],
      '16-17': [],
      '14-15': [],
      '11-13': [],
      '<11': [],
    }
    if (follicleCount) {
      follicleCount.forEach((follicle) => {
        if (follicle >= 19) {
          this.counts['>19'].push(0)
        } else if (follicle >= 18) {
          this.counts['18-19'].push(0)
        } else if (follicle >= 16) {
          this.counts['16-17'].push(0)
        } else if (follicle >= 14) {
          this.counts['14-15'].push(0)
        } else if (follicle >= 11) {
          this.counts['11-13'].push(0)
        } else {
          this.counts['<11'].push(0)
        }
      })
    }
  }
}
