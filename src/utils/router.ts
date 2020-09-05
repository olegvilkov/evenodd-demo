import { f7, f7ready } from 'framework7-react';

export const navigate = (redirectPath: string) =>
    new Promise ((resolve) => {
        f7ready(() => {
            resolve ( f7.views.main.router.back(redirectPath) )
        })
    })