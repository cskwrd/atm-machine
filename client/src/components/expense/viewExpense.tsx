import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExpDetailsService } from "../../services/expenseServices";
import useResponsive from "../../theme/hooks/useResponsive";
import { convertToCurrency, currencyFind, CurrencyType } from '../../utils/helper';
import Loading from "../loading";
import AlertBanner from '../AlertBanner';
import { Link as RouterLink } from 'react-router-dom';
import dataConfig from '../../config.json';
import { IExpenseDetails } from '../../api';

export const ViewExpense = () => {
    const navigate = useNavigate();
    const params = useParams();
    const mdUp = useResponsive('up', 'md');
    const expenseId = params.expenseId
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [expenseDetails, setExpenseDetails] = useState<IExpenseDetails>()
    // const [color] = useState<string[]>(['primary', 'secondary', 'error', 'warning', 'info', 'success']);
    const [expenseDate, setExpenseDate] = useState<Date>()

    useEffect(() => {
        const getExpenseDetails = async () => {
            setLoading(true)
            const expenseIdJson = {
                id: expenseId
            }
            const response_exp = await getExpDetailsService(expenseIdJson, setAlert, setAlertMessage)
            if (response_exp !== false) {
                setExpenseDetails(response_exp?.data?.expense)
                setExpenseDate(response_exp?.data?.expense?.expenseDate)
            }
            setLoading(false)
        }

        getExpenseDetails()
    }, [expenseId])

    return (
        <>
            {loading ? <Loading /> :
                <Container maxWidth='md' disableGutters={true} sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 5,
                }}>
                    <AlertBanner severity='error' alertMessage={alertMessage} showAlert={alert} />
                    <Box sx={{
                        bgcolor: (theme) => {
                            switch (Math.floor(Math.random() * 5)) {
                                case 0:
                                    return theme.palette['primary'].light;
                                case 1:
                                    return theme.palette['secondary'].light;
                                case 2:
                                    return theme.palette['error'].light;
                                case 3:
                                    return theme.palette['warning'].light;
                                case 4:
                                    return theme.palette['info'].light;
                                default:
                                    return theme.palette['success'].light;
                            }
                            // TODO :: do something like the following instead
                            // color is a state variable
                            // return theme.palette[color[Math.floor(Math.random() * 5)]].light
                        },
                        p: 6,
                        mb: 3,
                        width: '100%'
                    }}

                    >
                        <Typography variant='h3'>
                            {expenseDetails?.expenseName}
                        </Typography>
                        <Typography variant='body1'>
                            {expenseDetails?.expenseDescription}
                        </Typography>
                    </Box>
                    <Grid container spacing={3} p={4}>

                        <Grid item md={6} xs={12} >
                            <Typography variant='h6'>
                                Category : {expenseDetails?.expenseCategory}
                            </Typography>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Typography variant='h6'>
                                {/* TODO :: this date string likely needs foramtting */}
                                Date : {expenseDate?.toDateString()}
                            </Typography>
                        </Grid>
                       

                        <Grid item md={6} xs={12}>
                            <Typography variant='h6'>
                                {/* TODO :: set default symbol based on locale */}                                                {/* TODO :: if zero or null it should replace with string to indicate that not equal split between members, also uneven splits not implemented yet */}
                                Amount per person: {currencyFind(expenseDetails?.expenseCurrency ?? CurrencyType.USD) + " " + convertToCurrency(expenseDetails?.expensePerMember ?? 0)}
                            </Typography>
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <Typography variant='h6'>
                                Payment Method : {expenseDetails?.expenseType}
                            </Typography>
                        </Grid>

                        <Grid item md={6} xs={12} >
                            <Typography variant='h6'>
                                Expense Owner : {expenseDetails?.expenseOwner}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant='h6' color={(theme) => theme.palette['error'].main}>
                                {/* TODO :: set default symbol based on locale */}                                                {/* TODO :: if zero or null it should replace with string to indicate that not equal split between members, also uneven splits not implemented yet */}
                                Amount per person: {currencyFind(expenseDetails?.expenseCurrency ?? CurrencyType.USD) + " " + convertToCurrency(expenseDetails?.expensePerMember ?? 0)}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant='h6'>
                                Members :
                            </Typography>
                            {expenseDetails?.expenseMembers.map((member) => (
                                <Typography variant='body2'>
                                    {member}
                                    &nbsp;
                                </Typography>
                            ))}


                        </Grid>



                        {mdUp && <Grid item xs={0} md={6} />}
                        <Grid item xs={6} md={3}>
                            <Button fullWidth size="large" variant="outlined" onClick={() => navigate(-1)}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Button fullWidth size="large" variant="contained" component={RouterLink}
                                to={dataConfig.EDIT_EXPENSE_URL + expenseId}>
                                Edit
                            </Button>
                        </Grid>

                    </Grid>
                </Container>
            }
        </>
    )
}
