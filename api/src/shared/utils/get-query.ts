export const refactorQuery = (query: object) => {
  const where: object = { ...query };
  ['select', 'sort', 'limit', 'field'].forEach((key) => {
    delete where[key];
  });
  const res: object = { where };

  if ('sort' in query) {
    res['orderBy'] = (query['sort'] as string).split(',').map((field) => {
      return field.startsWith('-')
        ? { [field.slice(1)]: 'desc' }
        : { [field]: 'asc' };
    });
  } else res['orderBy'] = { createdAt: 'desc' };

  if ('page' in query) {
    res['skip'] = ((query['page'] as number) - 1) * (query['limit'] as number);
    res['take'] = query['limit'] as number;
  }

  if ('select' in query) {
    const select: object = {};
    (query['select'] as string).split(',').forEach((field) => {
      select[field] = true;
    });
    res['select'] = select;
  }

  return res;
};