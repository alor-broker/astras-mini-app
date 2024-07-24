﻿import {
  ApiConfig,
  ApiConfigProvider,
  ApiErrorsTracker,
  ApiRequestOptions,
  ApiResponse
} from "@api-lib";
import { HttpClient } from "@angular/common/http";
import {
  map,
  Observable,
  switchMap,
  take
} from "rxjs";
import { catchApiError } from "./utils/catchApiError.util";

export abstract class BaseHttpApiService {
  protected constructor(
    protected readonly configProvider: ApiConfigProvider,
    protected readonly errorsTracker: ApiErrorsTracker,
    protected readonly httpClient: HttpClient
  ) {

  }

  protected sendRequest<R>(
    requestFactory: (config: ApiConfig) => Observable<R>,
    options?: ApiRequestOptions,
    responseMap?: (response: R) => R
  ): ApiResponse<R> {
    return this.configProvider.getConfig().pipe(
      switchMap(config => requestFactory(config)),
      catchApiError<R | null>(
        () => null,
        options?.errorTracker ?? this.errorsTracker
      ),
      map(r => {
        if (r == null || responseMap == null) {
          return r;
        }

        return responseMap(r);
      }),
      take(1)
    )
  }
}
