import { Grid, Theme, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getGroupSettleService } from '../../../services/groupServices';
import useResponsive from '../../../theme/hooks/useResponsive';
import { CurrencyType } from '../../../utils/helper';

import AlertBanner from '../../AlertBanner';
import Iconify from '../../Iconify';
import Loading from '../../loading'
import SettlementCard from './settlementCard';
import UserBalanceChart from './userBalanceChart';

interface IGroupSettlementProps {
    currencyType: CurrencyType;
}

export const GroupSettlements: React.FunctionComponent<IGroupSettlementProps> = ({ currencyType }) => {
    const params = useParams();
    const [noSettle, setNoSettle] = useState(true)
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [groupSettlement, setGroupSettlemet] = useState<any[]>()

    const mdUp = useResponsive('up', 'md');
    useEffect(() => {
        const getGroupSettlement = async () => {
            setLoading(true)
            const groupIdJson = {
                id: params.groupId
            }
            const group_settle: any = await getGroupSettleService(groupIdJson, setAlert, setAlertMessage)
            const settlementData: any = group_settle?.data?.data;
            setGroupSettlemet(settlementData)
            // a line similar to the line below used to be executed in the loop creating settlement cards
            // when converting the file to ts that method wasn't allowed
            // so i moved it here
            setNoSettle((settlementData?.some((settlement: any[]) => settlement[2] > 0) ?? false) === false)
            setLoading(false)
        }
        getGroupSettlement()
    }, [params.groupId])

    return (
        <>
            {loading ? <Loading /> :
                <Box sx={{ pb: 3 }}>
                    <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='error' />
                    <Grid container spacing={2}>
                        {groupSettlement?.map((mySettle, index) => (
                            <React.Fragment key={index}> {/* The key must be on the fragment not on a child of the fragment */}
                                {mySettle[2] > 0 &&
                                    <Grid item xs={12} md={6}>
                                        <SettlementCard  mySettle={mySettle} currencyType={currencyType} /> 
                                    </Grid>
                                }
                            </React.Fragment>
                        ))}
                    </Grid>

                    {noSettle ?
                        <Grid container
                            direction="column"
                            style={{ 
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            minHeight: '200px' }}
                        >
                            <Iconify icon="icon-park-twotone:doc-success"  sx={{color: (theme: Theme) => theme.palette['success'].dark, fontSize: 100}} />
                            <Typography fontSize={18} textAlign={'center'} my={1}>
                            No Settlement requiered !
                            </Typography>
                        </Grid>
                         : <UserBalanceChart/>}
                </Box>
            }
        </>

    )
}
