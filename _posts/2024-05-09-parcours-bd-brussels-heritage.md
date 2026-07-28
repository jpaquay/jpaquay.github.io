---
layout: post
title: "Le Parcours BD de Bruxelles: Une Promenade Artistique au Cœur de la Capitale"
subtitle: "De Tintin à Gaston Lagaffe: exploration du patrimoine mural bruxellois guidée par une carte interactive."
cover-img: /assets/img/posts/2024-05-09-parcours-bd-brussels-heritage.webp
thumbnail-img: /assets/img/posts/2024-05-09-parcours-bd-brussels-heritage.webp
share-img: /assets/img/posts/2024-05-09-parcours-bd-brussels-heritage.webp
gh-repo: jpaquay/jpaquay.github.io/
gh-badge: [star, fork, follow]
tags: [brussels, bd, parcours-bd, urban-art, heritage, street-art, google-maps]
readtime: true
---

![Parcours BD Bruxelles Ligne Claire Art](/assets/img/posts/2024-05-09-parcours-bd-brussels-heritage.webp)

Bruxelles est incontestablement la capitale mondiale de la bande dessinée. Depuis 1991, sous l'impulsion de la Ville de Bruxelles et du **Centre Belge de la Bande Dessinée (CBBD)**, les murs aveugles du Pentagone, des Marolles et de Laeken se sont transformés en une immense galerie d'art à ciel ouvert.

Recensées dans l'inventaire officiel du patrimoine mobilier de la Région de Bruxelles-Capitale ([Collections Heritage Brussels - Institution 469](https://collections.heritage.brussels/fr/institutions/469)), ces fresques murales célèbrent les héros légendaires de la BD franco-belge: Tintin, Broussaille, Gaston Lagaffe, Lucky Luke, Ric Hochet, ou encore Le Chat de Philippe Geluck.

{: .box-note}
**Le Saviez-Vous ?** La toute première fresque du Parcours BD a été inaugurée au début des années 90 dans le quartier du Bon Secours (Broussaille par Frank Pé) pour réhabiliter un pignon défraîchi. Aujourd'hui, le parcours compte plus de 60 fresques monumentales !

---

## 🗺️ Carte Interactive du Parcours BD

Explorez les fresques emblématiques du centre-ville bruxellois grâce à notre carte interactive Google Maps ci-dessous. Cliquez sur chaque marqueur pour découvrir l'emplacement exact et le nom de la fresque :

<div id="parcours-bd-map" style="width: 100%; height: 480px; border-radius: 12px; margin: 24px 0; border: 1px solid #ddd; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"></div>

<script>
  function initParcoursMap() {
    const brusselsCenter = { lat: 50.8466, lng: 4.3505 };
    const map = new google.maps.Map(document.getElementById("parcours-bd-map"), {
      zoom: 14,
      center: brusselsCenter,
      styles: [
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [{ "color": "#d2e7d6" }]
        }
      ]
    });

    const murals = [
      { title: "1. Tintin & Milou (Hergé)", lat: 50.8447, lng: 4.3503, address: "Rue de l'Étuve 13" },
      { title: "2. Broussaille (Frank Pé)", lat: 50.8459, lng: 4.3444, address: "Rue de la Buanderie 15" },
      { title: "3. Ric Hochet (Tibet)", lat: 50.8465, lng: 4.3486, address: "Rue du Bon Secours 9" },
      { title: "4. Victor Sackville (Francis Carin)", lat: 50.8461, lng: 4.3496, address: "Rue du Marché aux Charbons 60" },
      { title: "5. Gaston Lagaffe (Franquin)", lat: 50.8497, lng: 4.3541, address: "Rue de l'Écuyer 9" },
      { title: "6. Le Chat (Philippe Geluck)", lat: 50.8412, lng: 4.3441, address: "Boulevard du Midi 27" },
      { title: "7. Spirou & Fantasio (Franquin)", lat: 50.8468, lng: 4.3425, address: "Rue Notre-Dame du Sommeil" },
      { title: "8. Lucky Luke (Morris)", lat: 50.8457, lng: 4.3441, address: "Rue de la Buanderie" },
      { title: "9. Corto Maltese (Hugo Pratt)", lat: 50.8572, lng: 4.3531, address: "Quai des Péniches" },
      { title: "10. Cubitus (Dupa)", lat: 50.8525, lng: 4.3458, address: "Rue de Flandre 109" }
    ];

    murals.forEach((mural, i) => {
      const marker = new google.maps.Marker({
        position: { lat: mural.lat, lng: mural.lng },
        map: map,
        title: mural.title,
        label: `${i + 1}`
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<div style="padding:4px; font-family:sans-serif;"><strong>${mural.title}</strong><br><small style="color:#666;">📍 ${mural.address}</small></div>`
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    });
  }
</script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDb0OwKJ3A4AnSfuMQkvnzZTHusuxjsous&callback=initParcoursMap" async defer></script>

---

## 🎨 Les Incontournables du Parcours BD

### 1. Tintin et Milou — L'Affaire Tournesol (Rue de l'Étuve 13)
À deux pas du Manneken-Pis, cette fresque iconique montre Tintin et le Capitaine Haddock descendant une échelle de secours sous le regard attentif de Milou. C'est l'un des arrêts les plus photographiés de Bruxelles !

### 2. Broussaille (Rue de la Buanderie 15)
Créée par Frank Pé, cette fresque romantique représente Broussaille et son amie se promenant dans le quartier du Marché aux Puces. Elle symbolise la naissance du parcours mural bruxellois.

### 3. Gaston Lagaffe (Rue de l'Écuyer 9)
L'anti-héros gaffeur d'André Franquin trône fièrement près des Galeries Royales Saint-Hubert, capturant toute la poésie et le burlesque de la bande dessinée belge.

---

## 🏛️ Conservation du Patrimoine avec Heritage Brussels

L'inventaire officiel de la Région Bruxelles-Capitale ([Heritage Brussels](https://collections.heritage.brussels/fr/institutions/469)) assure le recensement, la restauration régulière et la préservation de ce musée à ciel ouvert. Chaque fresque fait l'objet d'un suivi minutieux pour protéger la couche picturale face aux intempéries urbaines.

Que vous soyez un passionné du 9e Art ou un flâneur du dimanche à vélo, parcourir ces ruelles pavées vous plongera directement dans les bulles de votre enfance !
