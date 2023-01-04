import { Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getGroupCategoryExpService } from '../../../services/expenseServices';
import AlertBanner from '../../AlertBanner';
import Loading from '../../loading';
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chart.js/auto'
import { convertToCurrency, currencyFind, CurrencyType } from '../../../utils/helper';

interface IGroupCategoryGraphProps {
    currencyType: CurrencyType;
}

const GroupCategoryGraph: React.FunctionComponent<IGroupCategoryGraphProps> = ({ currencyType }) => {
    const params = useParams();
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState<string>("")
    const [loading, setLoading] = useState(true)
    const [categoryExp, setCategoryExp] = useState<any[]>()

    const data = {
        labels: categoryExp?.map(category => (category._id)),
        datasets: [
            {
                label: 'Category Expenses',
                data: categoryExp?.map(category => (category.amount)),
                fill: true,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                ],
                borderWidth: 1,
                // borderColor: ["red", "green", "Blue", "Yellow", "Orange", "Violet"]
            }
        ]
    }

    useEffect(() => {
        const getGroupCategoryExpense = async () => {
            setLoading(true)
            const groupIdJson = {
                id: params.groupId
            }
            const category_exp: any = await getGroupCategoryExpService(groupIdJson, setAlert, setAlertMessage)
            setCategoryExp(category_exp.data.data)
            setLoading(false)
        }
        getGroupCategoryExpense()
    }, [params.groupId])

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='error' />
            <Doughnut data={data} options={{
                plugins: {   
                    datalabels: {
                        color:'error',
                        formatter: (value: number) => {
                            return currencyFind(currencyType) + ' ' + convertToCurrency(value) ;
                        }
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            padding: 18
                        },
                    },
                }
            }} plugins={[ChartDataLabels as any]}/>
            <Typography variant='subtitle1' p={3}>
                <center>Category Expense chart</center>
            </Typography>
        </>
    )
}

export default GroupCategoryGraph