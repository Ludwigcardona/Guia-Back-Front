/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";

// Estilo para las tarjetas dinámicas
const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-8px)",
  },
  width: "100%",
  marginBottom: theme.spacing(2),
  borderRadius: "20px",
  backgroundColor: "#f9f9f9",
  padding: theme.spacing(3),
  [theme.breakpoints.up("md")]: {
    width: "75%",
    margin: "auto",
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1.5),
  fontSize: "0.875rem",
  fontWeight: "bold",
  textTransform: "none",
  borderRadius: "10px",
  transition: "background-color 0.3s ease",
}));

const ActivateButton = styled(ActionButton)({
  backgroundColor: "#4caf50",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#388e3c",
  },
});

const DeactivateButton = styled(ActionButton)({
  backgroundColor: "#ff9800",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#f57c00",
  },
});

const DeleteButton = styled(ActionButton)({
  backgroundColor: "#f44336",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#d32f2f",
  },
});

const UpdateButton = styled(ActionButton)({
  backgroundColor: "#2196f3",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#1976d2",
  },
});

const ClientesLista = () => {
  const [clientes, setClientes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formValues, setFormValues] = useState({
    nombre_cliente: "",
    correo_electronico: "",
    telefono: "",
    cliente_activo: true,
  });
  const [selectedCliente, setSelectedCliente] = useState<any>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [actionType, setActionType] = useState<"create" | "update">("create");

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const respuesta = await fetch("http://localhost:2000/api/clientes");
      if (!respuesta.ok) throw new Error("Error al obtener los clientes");
      const data = await respuesta.json();
      setClientes(data);
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
      setErrorMessage("Error al obtener los clientes");
      setOpenSnackbar(true);
    }
  };

  const handleOpenModal = (cliente: any = null) => {
    setSelectedCliente(cliente);

    if (cliente) {
      setFormValues({
        nombre_cliente: cliente.nombre_cliente,
        correo_electronico: cliente.correo_electronico,
        telefono: cliente.telefono,
        cliente_activo: cliente.cliente_activo,
      });
      setActionType("update");
    } else {
      setFormValues({
        nombre_cliente: "",
        correo_electronico: "",
        telefono: "",
        cliente_activo: true,
      });
      setActionType("create");
    }

    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCliente(null);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSaveCliente = async () => {
    try {
      let url;
      let method;
      if (actionType === "create") {
        url = "http://localhost:2000/api/clientes";
        method = "POST";
      } else if (actionType === "update") {
        url = `http://localhost:2000/api/clientes/${selectedCliente._id}`;
        method = "PUT";
      }

      const response = await fetch(`${url}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al guardar el cliente");
      }

      fetchClientes();
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar el cliente:", error);
      setErrorMessage("Error al guardar el cliente");
      setOpenSnackbar(true);
    }
  };

  const handleActivate = async (id: string) => {
    try {
      await fetch(`http://localhost:2000/api/clientes/activate/${id}`, {
        method: "PUT",
      });
      fetchClientes();
    } catch (error) {
      console.error("Error al activar el cliente:", error);
    }
  };

  const handleDeactivate = async (id: string) => {
    try {
      await fetch(`http://localhost:2000/api/clientes/deactivate/${id}`, {
        method: "PUT",
      });
      fetchClientes();
    } catch (error) {
      console.error("Error al desactivar el cliente:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:2000/api/clientes/${id}`, {
        method: "DELETE",
      });
      fetchClientes();
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setErrorMessage("");
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "100px" }}>
      <section
        style={{
          // Gradiente de colores
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
          // Espaciado interno
          padding: "20px",
          // Bordes redondeados
          borderRadius: "10px",
          // Color del texto
          color: "#fff",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal()}
          style={{ marginBottom: "30px" }}
        >
          Crear Cliente
        </Button>
        <Grid container spacing={3}>
          {clientes.map((cliente: any) => (
            <Grid item xs={12} md={6} key={cliente._id}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {cliente.nombre_cliente}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Correo: {cliente.correo_electronico}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Teléfono: {cliente.telefono}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      color: cliente.cliente_activo ? "#4caf50" : "#f44336",
                      fontWeight: "bold",
                    }}
                  >
                    {cliente.cliente_activo ? "Activo" : "Desactivado"}
                  </Typography>
                  <UpdateButton onClick={() => handleOpenModal(cliente)}>
                    Actualizar
                  </UpdateButton>
                  {cliente.cliente_activo ? (
                    <DeactivateButton
                      onClick={() => handleDeactivate(cliente._id)}
                    >
                      Desactivar
                    </DeactivateButton>
                  ) : (
                    <ActivateButton onClick={() => handleActivate(cliente._id)}>
                      Activar
                    </ActivateButton>
                  )}
                  <DeleteButton onClick={() => handleDelete(cliente._id)}>
                    Eliminar
                  </DeleteButton>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </section>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>
          {actionType === "create" ? "Crear Cliente" : "Actualizar Cliente"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre"
            name="nombre_cliente"
            value={formValues.nombre_cliente}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Correo Electrónico"
            name="correo_electronico"
            value={formValues.correo_electronico}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Teléfono"
            name="telefono"
            value={formValues.telefono}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSaveCliente} color="primary">
            {actionType === "create" ? "Crear" : "Actualizar"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ClientesLista;