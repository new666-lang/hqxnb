module.exports = class Result {
  static success(data) {
    return {
      success: true,
      data
    }
  }

  static error(data) {
    return {
      success: false,
      data
    }
  }
}