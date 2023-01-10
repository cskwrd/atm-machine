import { Container, Box } from "@mui/material"
import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getGroupDetailsService } from "../../../services/groupServices"
import AlertBanner from "../../AlertBanner"
import Loading from "../../loading"
import 'chart.js/auto'
import { Bar } from "react-chartjs-2"
import useResponsive from "../../../theme/hooks/useResponsive"


export const UserBalanceChart: React.FunctionComponent = () => {
    const params = useParams();
    const mdUp = useResponsive('up', 'md');
    const [loading, setLoading] = useState(false)
    const [graphData, setGraphData] = useState<number[]>([])
    const [graphLabel, setGraphLabel] = useState<string[]>([])
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')


    const data = {
        labels: graphLabel,
        datasets: [
            {
                label: 'User Balance',
                data: graphData,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
            }
        ]
    }

    useEffect(() => {
        const getGroupDetails = async () => {
            setLoading(true)
            const groupIdJson = {
                id: params.groupId
            }
            const response_group: any = await getGroupDetailsService(groupIdJson, setAlert, setAlertMessage)
            let splits: any[] = Object.entries(response_group?.data?.group?.split[0])
            const data: number[] = []
            const labels: string[] = []
            splits.forEach((splitData) => {
                if (splitData[1] < 0) {
                    data.push(Math.abs(splitData[1]))
                    labels.push(splitData[0])
                }
            })
            setGraphData(data)
            setGraphLabel(labels)
            setLoading(false)
        }
        getGroupDetails()
    }, [params.groupId])

    return (
        <>
            {loading ? <Loading /> :
                <Container sx={{ my: 6 }}>
                    <AlertBanner showAlert={alert} alertMessage={alertMessage} severity={'error'} />
                    <Box height={350} my={2}>
                        <Bar data={data} options={{
                            scales: {
                                x: {
                                    ticks: {
                                        display: mdUp
                                    },
                                }
                            },
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            }
                        }} />
                    </Box>
                </Container>}
        </>
    )
}

export default UserBalanceChart