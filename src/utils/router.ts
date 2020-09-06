import { f7, f7ready } from 'framework7-react';
import { Router } from 'framework7/modules/router/router';

export const navigate = (redirectPath: string, options?: Router.RouteOptions) =>
    new Promise ((resolve) => {
        f7ready(() => {
            resolve ( f7.views.main.router.navigate(redirectPath, options) )
        })
    })