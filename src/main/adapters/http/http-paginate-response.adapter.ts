export class HttpPaginateResponseAdapter {
  static response(total: number, page: number, limit: number, data: any[]) {
    return {
      total: total,
      page: page,
      total_pages: Math.ceil(total / limit),
      limit: limit,
      data: data
    }
  }
}
