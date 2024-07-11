function getPostRequestOption(data) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: "follow",
  };
  return requestOptions;
}
function getSecurePostRequestOption(data) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: "follow",
    credentials: "include",
  };
  return requestOptions;
}

function getGetRequestOption() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  return requestOptions;
}
export {
  getPostRequestOption,
  getSecurePostRequestOption,
  getGetRequestOption,
};
