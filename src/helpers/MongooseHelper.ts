import SortDirection from '@/types/enums/SortDirection'
import AggregateOpt from '@/types/mongoose/AggregateOpt'

export default class MongooseHelper {
  static fullText(phrase: string) {
    const exp: Array<string> = phrase.split(' ')
    return exp.map((word: string) => '"' + word + '"').join(' ')
  }

  static aggregateMatch(filters: any) {
    const match: any = {}
    const entries: any[] = Object.entries(filters)

    entries
      .filter(([, value]) => value !== undefined)
      .forEach(([key, value]) => {
        if (key.toLowerCase() === 'freetext') {
          match.$text = { $search: MongooseHelper.fullText(value) }
        } else {
          match[key] = value
        }
      })

    return match
  }

  static aggregateSort(sortField: string, sortDirection: string) {
    const direction: number = sortDirection === SortDirection.ASC ? 1 : -1
    return { [sortField]: direction }
  }

  static aggregateFacet(pageSize: number, pageIndex: number, extra?: AggregateOpt) {
    const unset: any = [...(extra?.unset ?? [])]
    const skip: number = (pageIndex - 1) * pageSize
    const limit: number = pageSize

    const facet: any = {
      count: [{ $count: 'Count' }],
      data: [{ $skip: skip }]
    }

    if (unset?.length) {
      facet.data.push({ $unset: unset })
    }

    if (limit > 0) {
      facet.data.push({ $limit: limit })
    }

    if (extra?.project) {
      facet.data.push({ $project: extra.project })
    }

    return facet
  }
}
