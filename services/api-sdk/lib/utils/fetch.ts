import "server-only";
import path from "path";
import _ from "lodash";

/**
 * A service for making requests to the server.
 *
 * @param options - The options for the service.
 */
export class FetchService {
  constructor(options) {
    this.requestInterceptor = options?.requestInterceptor;
    this.responseInterceptor = options?.responseInterceptor;
    this.baseUrl = options?.baseUrl;
  }
  /**
   * @public
   * Fetches data from the server.
   *
   * @param url - The URL to fetch data from.
   * @param options - The options for the request.
   *
   * @returns The response from the server.
   */
  async fetch(url, options) {
    let newOptions = {};
    if (this.requestInterceptor) {
      newOptions = _.merge(
        newOptions,
        await this.requestInterceptor(newOptions),
      );
    }
    if (options) {
      newOptions = _.merge(newOptions, options);
    }
    const formattedUrl =
      this.baseUrl && url.startsWith("/")
        ? path.join(new URL(this.baseUrl).pathname, url)
        : url;
    const response = await fetch(
      new URL(formattedUrl, this.baseUrl),
      newOptions,
    );
    return this.responseInterceptor?.(response) ?? response;
  }
  /**
   * @public
   * Makes a GET request to the server.
   *
   * @param url - The URL to make the request to.
   * @param options - The options for the request.
   */
  async get(url, options) {
    return this.fetch(url, { ...options, method: "GET" });
  }
  /**
   * @public
   * Makes a POST request to the server.
   *
   * @param url - The URL to make the request to.
   * @param body - The body of the request.
   * @param options - The options for the request.
   */
  async post(url, body, options) {
    return this.fetch(url, {
      ...options,
      method: "POST",
      body,
    });
  }
  /**
   * @public
   * Makes a PUT request to the server.
   *
   * @param url - The URL to make the request to.
   * @param body - The body of the request.
   * @param options - The options for the request.
   */
  async put(url, body, options) {
    return this.fetch(url, {
      ...options,
      method: "PUT",
      body,
    });
  }
  /**
   * @public
   * Makes a DELETE request to the server.
   *
   * @param url - The URL to make the request to.
   * @param options - The options for the request.
   */
  async delete(url, options) {
    return this.fetch(url, {
      ...options,
      method: "DELETE",
    });
  }
}
