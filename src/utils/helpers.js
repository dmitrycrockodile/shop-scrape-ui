export function handleResponse(res) {
  if (res.data.success) {
    return {
      ...res.data,
    };
  }
}

export function handleError(err) {
  return {
    message: err.response?.data?.message || "An error occured",
    errors: err.response?.data?.errors || err.response?.data?.error || null,
  };
}

export function cutString(str, length) {
    const newLength = str.length > length ? length : (str.length - 1);
 
    switch (str[newLength]) {
       case ',':
       case '(':
       case ')':
       case '"':
       case "'":
       case '_':
       case '-':
          return cutString(str, newLength - 1);
 
       case '.':
       case '!':
       case '?':
          return str.slice(0, newLength + 1); 
    }
 
    return str.slice(0, newLength) + '...';
 };