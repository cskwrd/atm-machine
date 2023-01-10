import { Box } from "@mui/material"
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { getUserCategoryExpService } from '../../services/expenseServices';
import AlertBanner from '../AlertBanner';
import Loading from '../loading';
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chart.js/auto'
import { convertToCurrency } from '../../utils/helper';
export const CategoryExpenseChart = () => {

    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [categoryExp, setCategoryExp] = useState<any[]>()
    const profile = JSON.parse(localStorage.getItem("profile") ?? "{}")

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
                //borderColor: ["red", "green", "Blue", "Yellow", "Orange", "Violet"]
            }
        ]
    }


    useEffect(() => {
        const getGroupCategoryExpense = async () => {
            setLoading(true)
            const userIdJson = {
                user: profile.emailId
            }
            const category_exp: any = await getUserCategoryExpService(userIdJson, setAlert, setAlertMessage)
            setCategoryExp(category_exp.data.data)
            setLoading(false)
        }
        getGroupCategoryExpense()

    }, [profile.emailId])

    return (
        <>
        {loading ? <Loading /> :
        <Box sx={{
            p: 5,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 5
        }}>
              <Typography variant="h6" mb={2}>
                Category Expense Chart
            </Typography>
                    <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='error' />
                    <Box height={500}>
                    <Doughnut data={data} options={{
                        maintainAspectRatio: false,
                        plugins: {   
                            datalabels: {
                                display:false,
                                formatter: (value: number) => {
                                return convertToCurrency(value) ;
                                }
                            },
                            legend: {
                                display: true,
                                position: 'bottom',
                                labels: {
                                    padding: 10
                                },
                            },
                        }
                    }} plugins={[ChartDataLabels as any]}/>
                    </Box>                   
        </Box>}
        </>
    )
}
