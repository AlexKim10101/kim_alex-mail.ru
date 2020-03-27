import React, { useEffect } from 'react'
import classnames from 'classnames'
import { usePickerState, usePickerDispatch } from '../dates-picker-context'
import {
  steps,
  stepsLabels,
  CHANGE_PERIOD,
  CHANGE_CALENDAR_TYPE,
} from '../../utils/consts'
import './period-side-bar.css'


export default function PeriodSideBar() {
  const { step, period } = usePickerState()
  const dispatch = usePickerDispatch()
  
  const onClick = (p) => dispatch({ type: CHANGE_PERIOD, period: p })

  const allowedPeriodTypes = steps.slice(0, steps.indexOf(step) + 1)
  const clsx = (p) => classnames('period-Btn', { 'active-period': p === period })

  useEffect(() => {
    if (!allowedPeriodTypes.includes(period)) {
      dispatch({
        type: CHANGE_PERIOD,
        period: allowedPeriodTypes[allowedPeriodTypes.length - 1],
      })
    }
  }, [allowedPeriodTypes, period, dispatch])

  useEffect(() => {
    dispatch({ type: CHANGE_CALENDAR_TYPE, calendarType: period })
  }, [dispatch, period])
  
  return (
    <div className="period-side-bar">
      <div className="period-side-bar__title">
        <strong>Период:</strong>
      </div>
      {allowedPeriodTypes.map((period, idx) => (
        <button
          key={period}
          className={clsx(period)}
          onClick={() => onClick(period)}
        >
          {stepsLabels[idx]}
        </button>
      ))}
    </div>  
  )
}
