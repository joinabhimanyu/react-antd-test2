import { Button, notification } from 'antd';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom'

const Counter = () => {

    const [couterValue, setCounterValue] = useState(null)
    const history = useHistory()

    useEffect(() => {
        // notification.open({
        //     message: 'Notification',
        //     description:
        //         'Component mounted',
        // });
        return () => {
            // notification.open({
            //     message: 'Notification',
            //     description:
            //         'Component is unmounted',
            // });
        }
    }, [])

    useEffect(() => {
        if (couterValue) {
            // notification.open({
            //     message: 'Notification',
            //     description:
            //         'Counter changed',
            // });
        }
    }, [couterValue])

    const handleIncrement = useCallback(() => {
        setCounterValue((couterValue || 0) + 1)
    }, [couterValue]);

    const handleDecrement = useCallback(() => {
        setCounterValue((couterValue || 0) - 1)
    }, [couterValue])


    const renderCouterVariable = useMemo(() => (
        <div style={{ background: couterValue >10 ? 'red' : (couterValue > 5 && couterValue < 10 ? 'green' : 'blue') }}>
            <span>The current counter value: {couterValue}</span>
        </div>
    ), [couterValue])

    return (
        <div>
            <h3>{renderCouterVariable}</h3>
            <Button type="primary" htmlType="button" style={{ marginLeft: '10px', display: 'flex' }}
                onClick={handleIncrement}>
                Increment
                                </Button>

            <Button type="primary" htmlType="button" style={{ marginLeft: '10px', display: 'flex' }}
                onClick={handleDecrement}>
                Decrement
                                </Button>

            <Button type="primary" htmlType="button" style={{ marginLeft: '10px', display: 'flex' }}
                onClick={() => { history.push('/StudentsListView') }}>
                Go to Students List VIew
                                </Button>
        </div>
    )
}

export default Counter;