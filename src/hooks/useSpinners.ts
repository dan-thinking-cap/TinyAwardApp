import { useCallback } from 'react';
import { useAppDispatch } from '../store';
import { addSpinner, removeSpinner } from '../store/slice/user.slice';

export default function () {
  const dispatch = useAppDispatch();

  const addOneSpinner = useCallback(() => {
    dispatch(addSpinner());
  }, [dispatch]);

  const removeOneSpinner = useCallback(() => {
    dispatch(removeSpinner());
  }, [dispatch]);

  return { addOneSpinner, removeOneSpinner };
}
