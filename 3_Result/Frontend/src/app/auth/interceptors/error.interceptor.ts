import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An error occurred';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = error.error.message;
      } else {
        // Server-side error
        if (error.status === 401) {
          // Clear any stored tokens and redirect to login
          localStorage.removeItem('sports_jwt_token');
          window.location.href = '/login';
          errorMessage = 'Session expired. Please login again.';
        } else {
          errorMessage = error.error?.message || `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
      }

      console.error('API Error:', errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
}; 