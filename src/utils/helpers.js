export function handleResponse(res) {
  if (res.data.success) {
    return {
      ...res.data,
    };
  }
}

export function handleError(err) {
  console.error(err);
  return {
    message: err.response?.data?.message || "An error occured",
    success: err.response?.data?.success || false,
  };
}
