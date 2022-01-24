import { Button, notification } from 'antd';
import React, { useEffect, useState } from 'react';

const Counter=()=>{

    const [couterValue, setCounterValue]=useState(null)

    useEffect(()=>{
        notification.open({
            message: 'Notification',
            description:
                'Component mounted',
        });
        return ()=>{
            notification.open({
                message: 'Notification',
                description:
                    'Component is unmounted',
            }); 
        }
    }, [])

    useEffect(()=>{
        if (couterValue) {
            notification.open({
                message: 'Notification',
                description:
                    'Counter changed',
            });
        }
    }, [couterValue])

    const handleIncrement=()=>{
        setCounterValue((couterValue||0)+1)
    }
    const handleDecrement=()=>{
        setCounterValue((couterValue||0)-1)
    }

    return (
        <div>
            <h3>Couter: {couterValue}</h3>
            <Button type="primary" htmlType="button" style={{ marginLeft: '10px', display: 'flex' }}
                    onClick={handleIncrement}>
                    Increment
                                </Button>

                                <Button type="primary" htmlType="button" style={{ marginLeft: '10px', display: 'flex' }}
                    onClick={handleDecrement}>
                    Decrement
                                </Button>
        </div>
    )
}

export default Counter;