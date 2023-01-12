import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {  Stack,  TextField, Grid, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import { Iconify } from '../Iconify';
import { editUser} from '../../services/auth';

import useResponsive from '../../theme/hooks/useResponsive';
// import PropTypes from 'prop-types';
import AlertBanner from '../AlertBanner';

// ----------------------------------------------------------------------

// EditForm.prototype = {
//     hideEditUser: PropTypes.func,
//     emailId: PropTypes.string,
//     firstName: PropTypes.string,
//     lastName: PropTypes.string
// }

interface IEditUserProps {
  hideEditUser: any,
  emailId: string,
  firstName: string,
  lastName: string,
  showHomeAlert: any,
  homeAlertMessage: any,
}

export default function EditForm({hideEditUser, emailId, firstName, lastName, showHomeAlert, homeAlertMessage} : IEditUserProps) {
  const smUp = useResponsive('up', 'sm');

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(" ");


  const EditSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required')
  });

  const formik = useFormik({
    initialValues: {
      emailId: emailId,
      firstName: firstName,
      lastName: lastName,
    },
    validationSchema: EditSchema,
    onSubmit: async () => {
      //User Edit Service call - Upon success user is redirected to dashboard 
      //Edit fail snackbar displays error
      const update_response = await editUser(values, setShowAlert, setAlertMessage, showHomeAlert, homeAlertMessage)
      if (update_response) {
        hideEditUser()
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;


  return (
    <>
        <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <AlertBanner showAlert={showAlert} alertMessage = {alertMessage} severity='error'/>
            <Stack spacing={3} direction="row"
            alignItems="center" justifyContent="space-between"
            >
            <TextField
              // name="firstName"
              fullWidth
              type="text"
              label="First Name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName} />

              <TextField
              // name="lastName"
              fullWidth
              type="text"
              label="Last Name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName} />
            </Stack>
          </Stack>
          <Grid container spacing={2} mt={2} justifyContent={'center'}> 
        <Grid item md={6} xs={11}>     
        <Button startIcon={<Iconify icon='material-symbols:cancel' sx={undefined}/>} size="large" onClick={hideEditUser} variant="outlined" color={'error'}
        sx={{width: '100%'}}
        >
          Cancel
        </Button>
        </Grid>
        <Grid item md={6} xs={11}>     
        <LoadingButton startIcon={<Iconify icon='teenyicons:tick-circle-solid' sx={undefined}/>}fullWidth size="large" type='submit' variant="outlined"  loading={isSubmitting}>
          Update
        </LoadingButton>
        </Grid>       
        </Grid>       

          
        </Form>
      </FormikProvider></>
  );
}
