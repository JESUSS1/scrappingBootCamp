CREATE database IF NOT exists scraperData;

use scraperData;

create table perfiles (
    id_profile int AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(60) NOT NULL
);

create table contactInfo(
	id_contactInfo int AUTO_INCREMENT PRIMARY KEY,
	id_profile int not null,
	email text null,
    telefono varchar(15) null,
    twitter varchar(20) null,
	FOREIGN KEY (id_profile) REFERENCES perfiles(id_profile)
);

create table webSite(
	id_webSite int AUTO_INCREMENT PRIMARY KEY,
    id_contactInfo int not null,
    categoria varchar(15) null,
    url text not null,
    FOREIGN KEY (id_contactInfo) REFERENCES contactInfo(id_contactInfo)
);

create table educationTitles(
	id_educationTitles int AUTO_INCREMENT PRIMARY KEY,
    id_profile int not null,
	nombre text null,
    enterprise text null,
    fecha_inicio varchar(10) null,
    fecha_fin varchar(10) null,
    FOREIGN KEY (id_profile) REFERENCES perfiles(id_profile)
);

create table experienceTitles(
	id_experienceTitles int AUTO_INCREMENT PRIMARY KEY,
    id_profile int not null,
	nombre text null,
    enterprise text null,
    fecha_inicio varchar(10) null,
    fecha_fin varchar(10) null,
	FOREIGN KEY (id_profile) REFERENCES perfiles(id_profile)
);