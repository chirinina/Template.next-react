'use client';

import { PrimeReactContext } from 'primereact/api';
import { Button } from 'primereact/button';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { Sidebar } from 'primereact/sidebar';
import { classNames } from 'primereact/utils';
import React, { useContext, useEffect, useState } from 'react';
import { AppConfigProps, LayoutConfig, LayoutState } from '@/types';
import { LayoutContext } from './context/layoutcontext';

const AppConfig = (props: AppConfigProps) => {
    const [scales] = useState([12, 13, 14, 15, 16]);
    const { layoutConfig, setLayoutConfig, layoutState, setLayoutState } = useContext(LayoutContext);
    const { setRipple, changeTheme } = useContext(PrimeReactContext);

    const onConfigButtonClick = () => {
        setLayoutState((prevState: LayoutState) => ({ ...prevState, configSidebarVisible: true }));
    };

    const onConfigSidebarHide = () => {
        setLayoutState((prevState: LayoutState) => ({ ...prevState, configSidebarVisible: false }));
    };

    const changeInputStyle = (e: RadioButtonChangeEvent) => {
        setLayoutConfig((prevState: LayoutConfig) => ({ ...prevState, inputStyle: e.value }));
    };

    const changeRipple = (e: InputSwitchChangeEvent) => {
        setRipple?.(e.value as boolean);
        setLayoutConfig((prevState: LayoutConfig) => ({ ...prevState, ripple: e.value as boolean }));
    };

    const changeMenuMode = (e: RadioButtonChangeEvent) => {
        setLayoutConfig((prevState: LayoutConfig) => ({ ...prevState, menuMode: e.value }));
    };

    const _changeTheme = (theme: string, colorScheme: string) => {
        changeTheme?.(layoutConfig.theme, theme, 'theme-css', () => {
            setLayoutConfig((prevState: LayoutConfig) => ({ ...prevState, theme, colorScheme }));
        });
    };

    const decrementScale = () => {
        setLayoutConfig((prevState: LayoutConfig) => ({ ...prevState, scale: prevState.scale - 1 }));
    };

    const incrementScale = () => {
        setLayoutConfig((prevState: LayoutConfig) => ({ ...prevState, scale: prevState.scale + 1 }));
    };

    const applyScale = () => {
        document.documentElement.style.fontSize = layoutConfig.scale + 'px';
    };

    useEffect(() => {
        applyScale();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layoutConfig.scale]);

    return (
        <>
            <button className="layout-config-button config-link" type="button" onClick={onConfigButtonClick}>
                <i className="pi pi-cog"></i>
            </button>

            <Sidebar visible={layoutState.configSidebarVisible} onHide={onConfigSidebarHide} position="right" className="layout-config-sidebar w-20rem">
                {!props.simple && (
                    <>
                        <h6>Escala</h6>
                        <div className="flex align-items-center">
                            <Button icon="pi pi-minus" type="button" onClick={decrementScale} rounded text className="w-2rem h-2rem mr-2" disabled={layoutConfig.scale === scales[0]}></Button>
                            <div className="flex gap-2 align-items-center">
                                {scales.map((item) => {
                                    return <i className={classNames('pi pi-circle-fill', { 'text-primary-500': item === layoutConfig.scale, 'text-300': item !== layoutConfig.scale })} key={item}></i>;
                                })}
                            </div>
                            <Button icon="pi pi-plus" type="button" onClick={incrementScale} rounded text className="w-2rem h-2rem ml-2" disabled={layoutConfig.scale === scales[scales.length - 1]}></Button>
                        </div>

                        <h6>Tipo Menu</h6>
                        <div className="flex">
                            <div className="field-radiobutton flex-1">
                                <RadioButton name="menuMode" value={'static'} checked={layoutConfig.menuMode === 'static'} onChange={(e) => changeMenuMode(e)} inputId="mode1"></RadioButton>
                                <label htmlFor="mode1">Estatico</label>
                            </div>
                            <div className="field-radiobutton flex-1">
                                <RadioButton name="menuMode" value={'overlay'} checked={layoutConfig.menuMode === 'overlay'} onChange={(e) => changeMenuMode(e)} inputId="mode2"></RadioButton>
                                <label htmlFor="mode2">Superponer</label>
                            </div>
                        </div>

                        <h6>Estilo de Formularios</h6>
                        <div className="flex">
                            <div className="field-radiobutton flex-1">
                                <RadioButton name="inputStyle" value={'outlined'} checked={layoutConfig.inputStyle === 'outlined'} onChange={(e) => changeInputStyle(e)} inputId="outlined_input"></RadioButton>
                                <label htmlFor="outlined_input">Limpio</label>
                            </div>
                            <div className="field-radiobutton flex-1">
                                <RadioButton name="inputStyle" value={'filled'} checked={layoutConfig.inputStyle === 'filled'} onChange={(e) => changeInputStyle(e)} inputId="filled_input"></RadioButton>
                                <label htmlFor="filled_input">Transparente</label>
                            </div>
                        </div>

                        <h6>Animaciones</h6>
                        <InputSwitch checked={layoutConfig.ripple as boolean} onChange={(e) => changeRipple(e)}></InputSwitch>
                    </>
                )}
                <h6>Diseño PrimeOne</h6>
                <div className="grid">
                {/* Sección de temas claros */}
                <div className="col-12 mb-2">
                    <div className="grid">
                    <div className="col-3">
                        <button
                        className="p-link w-2rem h-2rem flex justify-content-center align-items-center border-round shadow-2"
                        onClick={() => _changeTheme('lara-light-indigo', 'light')}
                        style={{ backgroundColor: '#5A5AE6' }}
                        >
                        <i className="pi pi-palette" style={{ color: 'white', fontSize: '1rem' }}></i>
                        </button>
                    </div>
                    <div className="col-3">
                        <button
                        className="p-link w-2rem h-2rem flex justify-content-center align-items-center border-round shadow-2"
                        onClick={() => _changeTheme('lara-light-blue', 'light')}
                        style={{ backgroundColor: '#3A9AD9' }}
                        >
                        <i className="pi pi-palette" style={{ color: 'white', fontSize: '1rem' }}></i>
                        </button>
                    </div>
                    <div className="col-3">
                        <button
                        className="p-link w-2rem h-2rem flex justify-content-center align-items-center border-round shadow-2"
                        onClick={() => _changeTheme('lara-light-purple', 'light')}
                        style={{ backgroundColor: '#883CAE' }}
                        >
                        <i className="pi pi-palette" style={{ color: 'white', fontSize: '1rem' }}></i>
                        </button>
                    </div>
                    <div className="col-3">
                        <button
                        className="p-link w-2rem h-2rem flex justify-content-center align-items-center border-round shadow-2"
                        onClick={() => _changeTheme('lara-light-teal', 'light')}
                        style={{ backgroundColor: '#1DBEB4' }}
                        >
                        <i className="pi pi-palette" style={{ color: 'white', fontSize: '1rem' }}></i>
                        </button>
                    </div>
                    </div>
                </div>

                {/* Sección de temas oscuros */}
                <div className="col-12 mb-2">
                    <div className="grid">
                    <div className="col-3">
                        <button
                        className="p-link w-2rem h-2rem flex justify-content-center align-items-center border-round shadow-2"
                        onClick={() => _changeTheme('lara-dark-indigo', 'dark')}
                        style={{ backgroundColor: '#3A3A8E' }}
                        >
                        <i className="pi pi-palette" style={{ color: 'white', fontSize: '1rem' }}></i>
                        </button>
                    </div>
                    <div className="col-3">
                        <button
                        className="p-link w-2rem h-2rem flex justify-content-center align-items-center border-round shadow-2"
                        onClick={() => _changeTheme('lara-dark-blue', 'dark')}
                        style={{ backgroundColor: '#285C9A' }}
                        >
                        <i className="pi pi-palette" style={{ color: 'white', fontSize: '1rem' }}></i>
                        </button>
                    </div>
                    <div className="col-3">
                        <button
                        className="p-link w-2rem h-2rem flex justify-content-center align-items-center border-round shadow-2"
                        onClick={() => _changeTheme('lara-dark-purple', 'dark')}
                        style={{ backgroundColor: '#662D91' }}
                        >
                        <i className="pi pi-palette" style={{ color: 'white', fontSize: '1rem' }}></i>
                        </button>
                    </div>
                    <div className="col-3">
                        <button
                        className="p-link w-2rem h-2rem flex justify-content-center align-items-center border-round shadow-2"
                        onClick={() => _changeTheme('lara-dark-teal', 'dark')}
                        style={{ backgroundColor: '#12857C' }}
                        >
                        <i className="pi pi-palette" style={{ color: 'white', fontSize: '1rem' }}></i>
                        </button>
                    </div>

                    {/* Temas adicionales: Soho y Viva */}
                    <div className="col-3 mt-2">
                        <button
                        className="p-link w-2rem h-2rem flex justify-content-center align-items-center border-round shadow-2"
                        onClick={() => _changeTheme('soho-light', 'light')}
                        style={{ backgroundColor: '#FFD700' }}
                        >
                        <i className="pi pi-palette" style={{ color: 'white', fontSize: '1rem' }}></i>
                        </button>
                    </div>
                    <div className="col-3 mt-2">
                        <button
                        className="p-link w-2rem h-2rem flex justify-content-center align-items-center border-round shadow-2"
                        onClick={() => _changeTheme('soho-dark', 'dark')}
                        style={{ backgroundColor: '#FFA500' }}
                        >
                        <i className="pi pi-palette" style={{ color: 'white', fontSize: '1rem' }}></i>
                        </button>
                    </div>
                    <div className="col-3 mt-2">
                        <button
                        className="p-link w-2rem h-2rem flex justify-content-center align-items-center border-round shadow-2"
                        onClick={() => _changeTheme('viva-light', 'light')}
                        style={{ backgroundColor: '#00C853' }}
                        >
                        <i className="pi pi-palette" style={{ color: 'white', fontSize: '1rem' }}></i>
                        </button>
                    </div>
                    <div className="col-3 mt-2">
                        <button
                        className="p-link w-2rem h-2rem flex justify-content-center align-items-center border-round shadow-2"
                        onClick={() => _changeTheme('viva-dark', 'dark')}
                        style={{ backgroundColor: '#009624' }}
                        >
                        <i className="pi pi-palette" style={{ color: 'white', fontSize: '1rem' }}></i>
                        </button>
                    </div>
                    </div>
                </div>
                </div>
                <h6>Bootstrap</h6>
                <div className="grid">
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('bootstrap4-light-blue', 'light')}>
                            <img src="/layout/images/themes/bootstrap4-light-blue.svg" className="w-2rem h-2rem" alt="Bootstrap Light Blue" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('bootstrap4-light-purple', 'light')}>
                            <img src="/layout/images/themes/bootstrap4-light-purple.svg" className="w-2rem h-2rem" alt="Bootstrap Light Purple" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('bootstrap4-dark-blue', 'dark')}>
                            <img src="/layout/images/themes/bootstrap4-dark-blue.svg" className="w-2rem h-2rem" alt="Bootstrap Dark Blue" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('bootstrap4-dark-purple', 'dark')}>
                            <img src="/layout/images/themes/bootstrap4-dark-purple.svg" className="w-2rem h-2rem" alt="Bootstrap Dark Purple" />
                        </button>
                    </div>
                </div>

                <h6>Diseño de materiales</h6>
                <div className="grid">
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('md-light-indigo', 'light')}>
                            <img src="/layout/images/themes/md-light-indigo.svg" className="w-2rem h-2rem" alt="Material Light Indigo" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('md-light-deeppurple', 'light')}>
                            <img src="/layout/images/themes/md-light-deeppurple.svg" className="w-2rem h-2rem" alt="Material Light DeepPurple" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('md-dark-indigo', 'dark')}>
                            <img src="/layout/images/themes/md-dark-indigo.svg" className="w-2rem h-2rem" alt="Material Dark Indigo" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('md-dark-deeppurple', 'dark')}>
                            <img src="/layout/images/themes/md-dark-deeppurple.svg" className="w-2rem h-2rem" alt="Material Dark DeepPurple" />
                        </button>
                    </div>
                </div>

                <h6>Diseño de materiales compacto</h6>
                <div className="grid">
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('mdc-light-indigo', 'light')}>
                            <img src="/layout/images/themes/md-light-indigo.svg" className="w-2rem h-2rem" alt="Material Light Indigo" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('mdc-light-deeppurple', 'light')}>
                            <img src="/layout/images/themes/md-light-deeppurple.svg" className="w-2rem h-2rem" alt="Material Light Deep Purple" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('mdc-dark-indigo', 'dark')}>
                            <img src="/layout/images/themes/md-dark-indigo.svg" className="w-2rem h-2rem" alt="Material Dark Indigo" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('mdc-dark-deeppurple', 'dark')}>
                            <img src="/layout/images/themes/md-dark-deeppurple.svg" className="w-2rem h-2rem" alt="Material Dark Deep Purple" />
                        </button>
                    </div>
                </div>
            </Sidebar>
        </>
    );
};

export default AppConfig;
