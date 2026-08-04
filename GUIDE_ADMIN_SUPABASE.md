# Accéder à l’administration BMA

Ce guide explique comment créer votre administrateur Supabase et gérer les réservations en toute sécurité.

## 1. Vérifier la connexion Supabase

1. Ouvrez le projet dans Supabase.
2. Dans **SQL Editor**, exécutez entièrement le fichier `supabase/schema.sql` du projet.
3. Vérifiez dans **Table Editor** que les tables `rooms`, `reservations`, `blocked_dates`, `pricing`, `gallery` et `equipments` existent.
4. Dans `rooms`, confirmez que **Petite Salle** et **Grande Salle** sont présentes.

## 2. Créer votre compte administrateur

1. Ouvrez **Authentication > Users** dans Supabase.
2. Cliquez sur **Add user > Create new user**.
3. Saisissez votre adresse e-mail et un mot de passe robuste.
4. Activez la confirmation automatique de l’e-mail si Supabase vous le propose.

## 3. Donner le rôle administrateur

Dans **SQL Editor**, remplacez l’adresse ci-dessous par celle du compte créé, puis exécutez :

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where email = 'votre-email@domaine.com';
```

Vérifiez le rôle :

```sql
select email, raw_app_meta_data
from auth.users
where email = 'votre-email@domaine.com';
```

Le résultat doit contenir `"role": "admin"`. Les politiques RLS du projet autorisent alors ce compte à administrer les tarifs, disponibilités, réservations, équipements et galerie.

## 4. Consulter les réservations

1. Ouvrez **Table Editor > reservations**.
2. Les nouveaux formulaires arrivent avec le statut `pending`.
3. Modifiez le statut en `confirmed`, `cancelled` ou `completed` selon l’avancement.

Une même salle ne peut pas être réservée deux fois à la même date : une contrainte base de données l’empêche.

## 5. Bloquer une journée

1. Ouvrez **Table Editor > blocked_dates**.
2. Ajoutez une ligne avec la salle et la date à fermer.
3. Cette date devient indisponible dans le formulaire public.
4. Supprimez la ligne pour rendre le créneau de nouveau disponible.

## 6. Modifier les tarifs et contenus

- Modifiez les prix de chaque salle dans `rooms` et `pricing`.
- Ajoutez ou modifiez les équipements dans `equipments`.
- Ajoutez les visuels de la galerie dans `gallery` après les avoir envoyés dans Supabase Storage.

## 7. Sécurité

- Ne partagez jamais une clé `service_role` dans le site ou dans `.env.local`.
- La clé publishable est prévue pour le navigateur et reste protégée par les politiques RLS.
- Faites uniquement des modifications d’administration avec un compte ayant `role: admin`.
