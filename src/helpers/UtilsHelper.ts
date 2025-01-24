export default class UtilsHelper {
  static slugify(text: string): string {
    return text.trim().toLowerCase().split(' ').join('-')
  }
}
