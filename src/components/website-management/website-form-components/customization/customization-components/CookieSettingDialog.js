import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Switch,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import Typography from "@mui/material/Typography";

const CookieSettingsDialog = (props) => {
    const { open, onClose } = props;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: "bold" }}>Cookie Settings</DialogTitle>
            <DialogContent>
                <Typography>When you visit our website, we may utilize cookies to store or retrieve information on your browser. This information can pertain to you, your preferences, or your device, and is primarily employed to ensure that the website functions according to your expectations. By using cookies,
                    we aim to provide you with a seamless browsing experience that aligns with your preferences.</Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Cookie Type</TableCell>
                                <TableCell align="right">Enabled</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Strictly Necessary</TableCell>
                                <TableCell align="right">
                                    <Switch checked disabled />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Performance Cookies</TableCell>
                                <TableCell align="right">
                                    <Switch />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Functional Cookies</TableCell>
                                <TableCell align="right">
                                    <Switch />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Targeting Cookies</TableCell>
                                <TableCell align="right">
                                    <Switch />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>

                <Button onClick={onClose} color="primary" variant="contained">
                    Confirm my choices
                </Button>
                <Button onClick={onClose} color="primary" variant="contained">
                    Accept all cookies
                </Button>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CookieSettingsDialog;
