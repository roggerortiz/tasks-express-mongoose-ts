export default class UtilsHelper {
  static slugify(text?: string): string | undefined {
    return text?.trim()?.toLowerCase()?.split(' ')?.join('-')
  }
}
