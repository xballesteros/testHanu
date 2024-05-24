import React, { useState } from 'react';
import { Card, Typography, Grid, IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const palos = [
    { nombre: 'corazones', color: 'red' },
    { nombre: 'diamantes', color: 'red' },
    { nombre: 'picas', color: 'black' },
];

const valores = ['A', '2', '3', '4'];

const crearMazo = () => {
    const mazo = [];
    for (const palo of palos) {
        for (const valor of valores) {
            mazo.push({ palo: palo.nombre, valor, color: palo.color });
        }
    }
    return mezclarArray(mazo);
};

const mezclarArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

const Naipe = ({ carta, onClick }) => (
    <Card
        onClick={onClick}
        style={{
            width: 160,
            height: 220,
            border: `2px solid ${carta ? carta.color : '#ccc'}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '8px',
            cursor: 'pointer',
            backgroundColor: carta ? '#f0f0f0' : 'transparent',
            visibility: 'visible',
        }}
    >
        {carta && (
            <>
                <Typography color={carta.color} style={{ alignSelf: 'flex-start' }}>
                    {carta.valor}
                    <Typography
                        color={carta.color}
                        style={{
                            alignSelf: 'flex-start',
                            fontSize: '15px',
                        }}
                    >
                        {carta.palo === 'corazones' && '♥'}
                        {carta.palo === 'diamantes' && '♦'}
                        {carta.palo === 'picas' && '♠'}
                        {carta.palo === 'tréboles' && '♣'}
                    </Typography>
                </Typography>
                <Typography
                    color={carta.color}
                    style={{
                        alignSelf: 'center',
                        fontSize: '58px',
                    }}
                >
                    {carta.palo === 'corazones' && '♥'}
                    {carta.palo === 'diamantes' && '♦'}
                    {carta.palo === 'picas' && '♠'}
                    {carta.palo === 'tréboles' && '♣'}
                </Typography>
                <Typography color={carta.color} style={{ alignSelf: 'flex-end', transform: 'rotate(180deg)' }}>
                    {carta.valor}
                    <Typography
                        color={carta.color}
                        style={{
                            alignSelf: 'flex-end',
                            fontSize: '15px',
                        }}
                    >
                        {carta.palo === 'corazones' && '♥'}
                        {carta.palo === 'diamantes' && '♦'}
                        {carta.palo === 'picas' && '♠'}
                        {carta.palo === 'tréboles' && '♣'}
                    </Typography>
                </Typography>
            </>
        )}
    </Card>
);

const JuegoDeCartas = () => {
    const [mazoIzquierda, setMazoIzquierda] = useState(crearMazo());
    const [mazoCentro, setMazoCentro] = useState([]);
    const [mazoDerecha, setMazoDerecha] = useState([]);
    const [valorObjetivo, setValorObjetivo] = useState(valores[Math.floor(Math.random() * valores.length)]);
    const [mensaje, setMensaje] = useState('');

    const moverCarta = (desdeMazo, haciaMazo, setDesdeMazo, setHaciaMazo) => {
        if (desdeMazo.length === 0) return;
        const carta = desdeMazo[0];
        setDesdeMazo(desdeMazo.slice(1));
        setHaciaMazo([carta, ...haciaMazo]);
    };

    const manejarClickMazoDerecha = () => {
        if (mazoDerecha.length === 0) return;
        const carta = mazoDerecha[0];
        setMazoDerecha(mazoDerecha.slice(1));
        setMazoIzquierda([carta, ...mazoIzquierda]);
    };

    const reiniciarJuego = () => {
        setMazoIzquierda(crearMazo());
        setMazoCentro([]);
        setMazoDerecha([]);
        setValorObjetivo(valores[Math.floor(Math.random() * valores.length)]);
        setMensaje('');
    };

    const verificarCondicionDeVictoria = () => {
        if (
            mazoIzquierda.length > 0 && mazoIzquierda[0].valor === valorObjetivo &&
            mazoCentro.length > 0 && mazoCentro[0].valor === valorObjetivo &&
            mazoDerecha.length > 0 && mazoDerecha[0].valor === valorObjetivo
        ) {
            setMensaje('¡EXCELENTE! ¡LO HAS LOGRADO!');
        } else {
            setMensaje('');
        }
    };

    React.useEffect(() => {
        verificarCondicionDeVictoria();
    }, [mazoIzquierda, mazoCentro, mazoDerecha]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backgroundColor: '#1e1e1e', padding: '20px', color: '#fff' }}>
            <Typography variant="h4">Juego de Cartas!</Typography>
            <Typography variant="h4">Valor a ordenar: <span style={{ color: '#ff0' }}>{valorObjetivo}</span></Typography>
            <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '20px', gap: '50px' }}>
                <Grid item>
                    {mazoIzquierda.length > 0 ? (
                        <Naipe
                            carta={mazoIzquierda[0]}
                            onClick={() => moverCarta(mazoIzquierda, mazoCentro, setMazoIzquierda, setMazoCentro)}
                        />
                    ) : (
                        <Naipe carta={null} />
                    )}
                </Grid>
                <Grid item>
                    {mazoCentro.length > 0 ? (
                        <Naipe
                            carta={mazoCentro[0]}
                            onClick={() => moverCarta(mazoCentro, mazoDerecha, setMazoCentro, setMazoDerecha)}
                        />
                    ) : (
                        <Naipe carta={null} />
                    )}
                </Grid>
                <Grid item>
                    {mazoDerecha.length > 0 ? (
                        <Naipe
                            carta={mazoDerecha[0]}
                            onClick={manejarClickMazoDerecha}
                        />
                    ) : (
                        <Naipe carta={null} />
                    )}
                </Grid>
            </Grid>
            <IconButton
                variant="contained"
                color="primary"
                onClick={reiniciarJuego}
                style={{ marginTop: '20px', color: '#fff' }}
            >
                <RefreshIcon style={{ fontSize: 30 }} />
                <Typography variant="button" style={{ marginLeft: '8px' }}>REINICIAR</Typography>
            </IconButton>
            {mensaje && <Typography variant="h5" style={{ marginTop: '20px', color: 'green' }}>{mensaje}</Typography>}
        </div>
    );
};

export default JuegoDeCartas;
