const formatToCurrency = (value: number) => {
  if (typeof value !== 'number') {
    return value;
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });
  return formatter.format(value);
};

export const fetchOrRefreshAuth = async (url: string, opts: RequestInit = {}) => {
  const baseUrl = process.env.REACT_APP_BACKEND_URL;
  opts.credentials = 'include';

  return await fetch(`${baseUrl}${url}`, opts).then(async (res) => {
    if (res.status !== 401) return res;

    return await fetch(`${baseUrl}/auth/refresh`, {
      method: 'POST',
      credentials: 'include'
    }).then(async (result) => {
      if (result.status === 200) return await fetch(`${baseUrl}${url}`, opts);

      return result;
    });
  });
};

export { formatToCurrency };
