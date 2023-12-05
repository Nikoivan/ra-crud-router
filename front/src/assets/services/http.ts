import { useEffect, useState } from "react";

type OptionsTypes = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: {
    "Content-Type": "application/json";
  };
  body?: string;
};

export default async function http(
  url: string,
  options: OptionsTypes = { method: "GET" },
  jsonTypeRes?: boolean
) {
  try {
    const response = await fetch(url, options);
    if (!(response.status >= 200 && response.status < 300)) {
      return { error: response.statusText };
    }
    if (jsonTypeRes) {
      return response;
    }
    const json = await response.json();
    return json || { error: "Ошибка ответа" };
  } catch (e) {
    console.log(e);
  }
}
