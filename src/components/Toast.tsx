import { useEffect } from 'react';
import { f7, f7ready } from 'framework7-react';
import { Toast as IToast } from 'framework7/components/toast/toast';

/**
 * Basic component for F7 Toast call
 */
export default function Toast (props: IToast.Parameters) {

    let toast: IToast.Toast;

    useEffect(() => {
        toast = f7.toast.create(props);
        f7ready(() => {
            toast.open()
        })
    }, [props])

    useEffect(() => {
        return () => {toast.close(); toast.destroy()}
    }, [])

    return null;
}