import {Button} from '@mui/material';

export default function SubmitButton({field, 
                                        form: {touched, errors, isSubmitting, isValid}, ...props}) {
    return (<Button {...field} 
                    disabled={isSubmitting} 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    {...props}>
            {props.label}
        </Button>
    );
}