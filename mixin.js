class Mixin {
  static fillRange (num1, num2) {
    const start = num1 < num2 ? num1 : num2
    const end = num2 > num1 ? num2 : num1
    let range = Array(end - start + 1).fill().map((item, index) => start + index)

    if (num1 > num2) {
      range = range.reverse()
    }

    return range
  }
}

module.exports = Mixin
