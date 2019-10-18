/** @format */

import {useState, useEffect} from 'react';
import {AxiosPromise} from 'axios';
import hash from 'hash-object';

type IStatus = 'loading' | 'error' | 'success';

function useFetch<T>(dataLoadder: (params) => AxiosPromise<T>, inputs: any = {}): {status: IStatus; error: string; data: T} {
  const [status, setStatus] = useState<IStatus>('loading');
  const [data, setData] = useState();
  const [error, setError] = useState();

  const configHash = hash(inputs);

  useEffect(() => {
    setStatus('loading');
    dataLoadder(inputs)
      .then(res => {
        console.log(1, res);
        setData(res.data);
        setStatus('success');
      })
      .catch(err => {
        console.log(2, err);
        setStatus('error')
        setError(err.message)
      })
  }, [configHash])

  return {data, status, error}
}

export default useFetch
