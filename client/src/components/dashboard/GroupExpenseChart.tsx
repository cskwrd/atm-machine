import { Box, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Bar, Pie } from "react-chartjs-2"
import { getUserGroupsService } from "../../services/groupServices"
import AlertBanner from "../AlertBanner"
import Loading from "../loading"
import 'chart.js/auto'
import { convertToCurrency } from "../../utils/helper"
import ChartDataLabels from 'chartjs-plugin-datalabels';
import useResponsive from '../../theme/hooks/useResponsive';

export const GroupExpenseChart = () => {
    const mdUp = useResponsive('up', 'md');
    const [loading, setLoading] = useState(true)
    const [groupExp, setGroupExp] = useState<any[]>()
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const profile = JSON.parse(localStorage.getItem("profile") ?? "{}")

    const data = {
        labels: groupExp?.map(group => (group.groupName)),
        datasets: [
            {
                label: 'Category Expenses',
                data: groupExp?.map(group => (group.groupTotal)),
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
        const getGroupExpense = async () => {
            setLoading(true)
            const userIdJson = {
                emailId: profile.emailId
            }
            const group_exp: any = await getUserGroupsService(userIdJson, setAlert, setAlertMessage)
            setGroupExp(group_exp.data.groups)
            setLoading(false)
        }
        getGroupExpense()

    }, [profile.emailId])

    return (
        <>{loading? <Loading/> : 
        <Box sx={{
            p: 5,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 5,
        }}>
            <Typography variant="h6" mb={2}>
                Groupwise Expense Chart
            </Typography>
            <AlertBanner showAlert={alert} alertMessage={alertMessage} severity = 'error' />
            <Box height={500}>
            <Pie data={data} options={{
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
                        position: mdUp? 'right' : 'bottom',
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