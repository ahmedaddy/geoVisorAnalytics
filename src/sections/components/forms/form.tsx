import React, { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import XIcon from '@untitled-ui/icons-react/build/esm/X';

import {
  CircularProgress,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  SvgIcon,
  Tooltip,
} from '@mui/material';
import Send01 from '@untitled-ui/icons-react/build/esm/Send01';
import Upload01 from '@untitled-ui/icons-react/build/esm/Upload01';
import { FileUploader } from 'src/sections/dashboard/file-manager/file-uploader';
import { useDialog } from 'src/hooks/use-dialog';
import toast, { Toaster } from 'react-hot-toast';
import FirebaseUsers from 'src/api/users';
import { User } from 'src/api/users/user-interface';
import emailjs from '@emailjs/browser';
import { FileIcon } from 'src/components/file-icon';
import { bytesToSize } from 'src/utils/bytes-to-size';

// Define the validation schema
const validationSchema = yup.object({
  fullName: yup.string().required('Nom complet est requis'),
  entreprise: yup.string().required('Entreprise partenaire est requis'),
  projet: yup.string().required('Intitulé du projet est requis'),
  email: yup.string().email('Format email invalide').required('Addresse Email est requis'),
  // files: yup.mixed().required('Veuillez sélectionner un fichier'),
});

const firebaseNewUser = new FirebaseUsers();

export const SubmitForm: FC = () => {
  // const [files, setFiles] = useState<File[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const uploadDialog = useDialog();

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      fullName: '',
      entreprise: '',
      projet: '',
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const serviceId = 'service_x2cjjd7';
      const templateId = 'template_qu6zqes';
      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            fullName: values.fullName,
            projet: values.projet,
            entreprise: values.entreprise,
            email: values.email,
          },
          {
            publicKey: 'gTw-7f1S50UtAjkgA',
          }
        );
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
        setLoading(false);
      }

      // if (files.length === 0) {
      //   toast.error('Aucun fichier sélectionné pour le téléchargement!');
      //   return;
      // } else if (files.length !== 2) {
      //   toast.error('Veuillez sélectionner exactement 2 fichiers.');
      //   return;
      // } else {
      //   handleUpload();
      //   try {
      //     setLoading(true);
      //     await firebaseNewUser.createUser(values as unknown as User);
      //     try {
      //       await emailjs.send(serviceId, templateId, {
      //         name: values.fullName,
      //         recipient: values.email,
      //       });
      //     } catch (error) {
      //       console.log(error);
      //     }
      //     toast.success('Votre candidature a été envoyée avec succès.');
      //     resetForm();
      //     setLoading(false);
      //   } catch (error) {
      //     toast.error('Échec de l’envoi de la candidature. Veuillez réessayer.');
      //     console.error('Échec de l’envoi de la candidature. Veuillez réessayer.: ', error);
      //   } finally {
      //     setSubmitting(false);
      //     setLoading(false);
      //   }
      // }
    },
  });

  const handleUpload = async () => {
    // if (files.length === 0) {
    //   toast.error('No files selected for upload');
    //   return;
    // }

    const firebaseUsers = new FirebaseUsers();
    console.log('return upload files', firebaseUsers);

    // try {
    //   await firebaseUsers.uploadFiles(formik.values.fullName, files);
    // } catch (error) {
    //   console.log('erorr' + error.message);

    //   toast.error('Error uploading files:', error.message);
    // }
  };

  useEffect(() => emailjs.init('gTw-7f1S50UtAjkgA'), []);

  return (
    <Box
      sx={{
        backgroundColor: 'neutral.900',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        color: 'neutral.100',
        py: '120px',
        p: 4,
        my: 2,
        borderRadius: 2,
      }}
    >
      {loading && <LinearProgress />}
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          spacing={3}
        >
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              ref={nameRef}
              required
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Partner Company"
              name="entreprise"
              required
              value={formik.values.entreprise}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.entreprise && Boolean(formik.errors.entreprise)}
              helperText={formik.touched.entreprise && formik.errors.entreprise}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Project needs"
              name="projet"
              required
              value={formik.values.projet}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.projet && Boolean(formik.errors.projet)}
              helperText={formik.touched.projet && formik.errors.projet}
              size="small"
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              required
              label="Addresse Email"
              ref={emailRef}
              name="email"
              type="email"
              size="small"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 6 }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={formik.isSubmitting ? <CircularProgress size={12} /> : <Send01 />}
          >
            Valider
          </Button>
        </Box>
      </form>
    </Box>
  );
};
