
TRUNCATE TABLE rel_category__product CASCADE;
TRUNCATE TABLE category CASCADE;
TRUNCATE TABLE product CASCADE;

-- Add all products
INSERT INTO product VALUES (1, 'VTT All Mountain Carbone', 'Vélo Tout Terrain de compétition avec un cadre tout carbone.', 4000, 'BTWIN', 'FEEL 900 S Team Edition', 'BLACK', 5, 'feel900.png', 1);
INSERT INTO product VALUES (2, 'VTT XC Carbone', 'Vélo Tout Terrain axé Cross Country tout carbone.', 3300, 'BTWIN', 'RACE 900 GX', 'WHITE', 3, 'race900.png', 1);
INSERT INTO product VALUES (3, 'Vélo de route RCR PRO RED ETAP AXS POWER', 'Vélo de route monté en AXS entièrement carbone paré pour la compétition.', 8500, 'BTWIN', 'RCR PRO RED ETAP', 'BLACK', 2, 'rcrpro.png', 1);
INSERT INTO product VALUES (4, 'VTT All Mountain SPECIALIZED pro', 'Descendez aussi vite que vous montez grâce à ce VTT tout suspendu de qualité supérieure.', 7200, 'SPECIALIZED', 'Stumpjumper Pro', 'BLUE', 3, 'stump.png', 1);
INSERT INTO product VALUES (5, 'Vélo de route Allez Alu CC', 'Vélo de route milieu de gamme qui convient à une activité régulière.', 1200, 'SPECIALIZED', 'Allez', 'RED', 5, 'allez.png', 1);
INSERT INTO product VALUES (6, 'VTT Trail Orbea Gloss Alu', 'Vélo Tout Terrain milieu de gamme de la célèbre marque Orbea.', 3500, 'ORBEA', 'Occam H20', 'YELLOW', 3, 'occam.png', 1);
INSERT INTO product VALUES (7, 'Velo de route Endurance Avant Orbea', 'Vélo de route destiné aux cyclistes réguliers exigeant un vélo robuste et rigide.', 2000, 'ORBEA', 'Avant H60', 'BLUE', 3, 'avant.png', 1);

-- Add categories
INSERT INTO category VALUES (1, 'Tout-suspendu');
INSERT INTO category VALUES (2, 'Semi-rigide');
INSERT INTO category VALUES (3, 'Rigide');
INSERT INTO category VALUES (4, 'VTT');
INSERT INTO category VALUES (5, 'Vélo de route');
INSERT INTO category VALUES (6, 'Aluminium');
INSERT INTO category VALUES (7, 'Carbone');

-- Add relation between categories and products
INSERT INTO rel_category__product VALUES (1, 1);
INSERT INTO rel_category__product VALUES (1, 4);
INSERT INTO rel_category__product VALUES (1, 7);
INSERT INTO rel_category__product VALUES (2, 2);
INSERT INTO rel_category__product VALUES (2, 4);
INSERT INTO rel_category__product VALUES (2, 7);
INSERT INTO rel_category__product VALUES (3, 3);
INSERT INTO rel_category__product VALUES (3, 5);
INSERT INTO rel_category__product VALUES (3, 7);
INSERT INTO rel_category__product VALUES (4, 1);
INSERT INTO rel_category__product VALUES (4, 4);
INSERT INTO rel_category__product VALUES (4, 7);
INSERT INTO rel_category__product VALUES (5, 3);
INSERT INTO rel_category__product VALUES (5, 5);
INSERT INTO rel_category__product VALUES (5, 6);
INSERT INTO rel_category__product VALUES (6, 1);
INSERT INTO rel_category__product VALUES (6, 4);
INSERT INTO rel_category__product VALUES (6, 6);
INSERT INTO rel_category__product VALUES (7, 3);
INSERT INTO rel_category__product VALUES (7, 5);
INSERT INTO rel_category__product VALUES (7, 6);
