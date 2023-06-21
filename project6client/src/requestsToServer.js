const hostname = "http://localhost:4000";
//const hostname = "https://jsonplaceholder.typicode.com";
//"http://localhost:4000";

export async function requestsGet(path) {
  console.log(hostname + path);
  const response = await fetch(hostname + path);
  return await response.json();
}

export async function requestsPost(path, object) {
  // console.log("line 12 in requestsPost");
  // console.log(JSON.stringify(object));
  // const response = await fetch(hostname + path, {
  //   method: "POST",
  //   body: JSON.stringify(object),
  //   headers: {
  //     "Content-type": "application/json",
  //   },
  // });
  // return await response.json();
  let requestBody;

  if (typeof object === "string") {
    requestBody = object;
  } else {
    requestBody = JSON.stringify(object);
  }

  console.log(requestBody);

  const response = await fetch(hostname + path, {
    method: "POST",
    body: requestBody,
    headers: {
      "Content-type": "application/json",
    },
  });

  return await response.json();
}

export async function requestsPut(path, object) {
  const response = await fetch(hostname + path, {
    method: "PUT",
    body: JSON.stringify(object),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return await response.json();
}

export async function requestsDelete(path) {
  const response = await fetch(hostname + path, {
    method: "DELETE",
  });
  return await response.json();
}
