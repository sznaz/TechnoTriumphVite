

import  { useState } from 'react';
import styles from './UploadResume.module.css';
import { styled } from '@mui/material/styles';
import { Button, Grid } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

interface UploadResumePageProps {
    setSelectedButton: (id: number) => void;
}



const UploadResumePage= ({ setSelectedButton }: UploadResumePageProps) =>  {
    
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRedirect = () => {
        setOpen(false);
        setSelectedButton(3);
    };

    return (
        <>
            <div className={styles.upload}>
                <div className={styles.uploadContainer}>
                    <div className={styles.dragText}>Drag and drop resumes</div>
                    <Button
                        className={styles.labelStyle}
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                    >
                        Or Browse
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => console.log(event.target.files)}
                            multiple
                        />
                    </Button>
                </div>
            </div>

            <div className={styles.help}>
                Please zip all the resumes and upload the zip file.
                <Grid item xs={12} md={6}>
                    <Button
                        variant="contained"
                        className={styles.screen2}
                        style={{ marginLeft: '15px', cursor: 'pointer' }}
                        onClick={handleClickOpen}
                    >
                        Next
                    </Button>
                </Grid>
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className={styles.close}>
                    <img
                        onClick={handleClose}
                        src="/src/assets/images/x.svg"
                        alt="Close dialog"
                        width={30}
                        height={30}
                      
                    />
                </div>
                <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: '40px' }}>
                    <img
                        src="/src/assets/images/grey.svg"
                        alt="Loader"
                        width={80}
                        height={80}
                      
                    />
                </div>
                <DialogContent>
                    <div className={styles.description}>
                        Unzipping the files and parsing them.
                    </div>
                    <div className={styles.txt}>
                        This will take a few minutes. <br />
                        You can close this screen and come back through the dashboard once the unzip and parsing is complete.
                    </div>
                    <Grid container spacing={2}>
                        <Grid
                            item
                            xs={12}
                            md={12}
                            style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: '20px' }}
                        >
                            <Button
                                variant="outlined"
                                className={styles.screen2}
                                style={{ marginLeft: '15px' }}
                                onClick={handleRedirect}
                            >
                                Ok
                            </Button>
                        </Grid>
                    </Grid>
                    <div className={styles.bTxt}>
                        The time required depends on the total number of resumes uploaded.
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UploadResumePage;
