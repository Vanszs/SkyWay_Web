# Prompt untuk AI Agent Membuat GeoJSON dari Google Maps

## System Prompt untuk AI Agent

```
Anda adalah AI agent yang bertugas membuat file GeoJSON untuk no-fly zones dan restricted areas di area Surabaya dan Sidoarjo.

Format yang harus Anda ikuti:

{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "[Nama Gedung/Lokasi]",
        "height": [Tinggi dalam meter],
        "restricted": true
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [longitude, latitude],
          [longitude, latitude],
          [longitude, latitude],
          [longitude, latitude],
          [longitude, latitude]
        ]]
      }
    }
  ]
}

PENTING:
1. Koordinat harus dalam format [longitude, latitude] (BUKAN latitude, longitude!)
2. Polygon harus closed (titik pertama = titik terakhir)
3. Untuk gedung persegi, ambil 4 pojok + 1 titik penutup (5 titik total)
4. Semua koordinat dalam desimal degrees (contoh: 112.7172, -7.4471)
```

## User Prompt Template

### Template 1: Berdasarkan Nama Lokasi
```
Buatkan GeoJSON untuk lokasi-lokasi berikut di Surabaya:

1. Tunjungan Plaza
2. Surabaya Town Square
3. Pakuwon Mall

Format:
- Ambil koordinat dari Google Maps
- Buat polygon dengan 4 pojok gedung
- Estimasi tinggi gedung (dalam meter)
- Set restricted: true untuk semua
```

### Template 2: Berdasarkan Kategori
```
Buatkan GeoJSON untuk semua RUMAH SAKIT di area Surabaya Timur.

Kriteria:
- Cari minimal 10 rumah sakit besar
- Tinggi gedung rata-rata 40-60 meter
- Area restricted untuk drone
- Format polygon dengan 5 titik (4 pojok + closing)
```

### Template 3: Berdasarkan Area Radius
```
Buatkan GeoJSON untuk semua gedung tinggi (>50m) dalam radius 5km dari:
Koordinat: -7.2575, 112.7521 (Surabaya Pusat)

Include:
- Mall/shopping center
- Hotel bintang 5
- Gedung perkantoran
- Apartemen tinggi
```

## Contoh Lengkap Request

```
Task: Buat GeoJSON untuk restricted areas di Sidoarjo

Locations:
1. Alun-alun Sidoarjo
   - Cari di Google Maps: "Alun-alun Sidoarjo"
   - Buat polygon sekitar area taman
   - Height: 25m (area terbuka)
   
2. RSUD Sidoarjo
   - Cari: "RSUD Sidoarjo"
   - Polygon area gedung rumah sakit
   - Height: 42m (estimasi 10 lantai)
   
3. Lippo Plaza Sidoarjo
   - Cari: "Lippo Plaza Sidoarjo"
   - Polygon area mall
   - Height: 45m

Output format: Valid GeoJSON dengan struktur seperti contoh di atas
```

## Cara Validasi Koordinat

Setelah AI membuat GeoJSON, validasi dengan:

1. **Check Format**
   - Longitude harus antara 112.6 - 112.9 (Surabaya area)
   - Latitude harus antara -7.5 - -7.1 (Surabaya area)
   
2. **Check Polygon**
   - Minimal 4 titik (5 dengan closing)
   - Titik pertama = titik terakhir
   - Urutan searah jarum jam atau berlawanan
   
3. **Visualisasi**
   - Upload ke geojson.io untuk preview
   - Check apakah lokasi sudah benar

## API Alternative

Jika ingin otomatis, gunakan:

### Google Places API
```javascript
// Search nearby places
const places = await fetch(
  `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-7.2575,112.7521&radius=5000&type=hospital&key=YOUR_API_KEY`
)

// Get place details untuk koordinat
const details = await fetch(
  `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=YOUR_API_KEY`
)
```

### Overpass API (OpenStreetMap)
```javascript
// Query building footprints
const query = `
[out:json];
(
  way["building"]["name"~".*Mall.*"](around:5000,-7.2575,112.7521);
);
out geom;
`
```

## Tools untuk AI Agent

Rekomendasikan AI agent menggunakan:

1. **geopy** (Python) - Geocoding
2. **shapely** (Python) - Manipulasi geometry
3. **requests** - API calls
4. **geojson** library - Validasi format

## Contoh Script Python untuk AI Agent

```python
import geojson
from geopy.geocoders import Nominatim
import requests

def create_building_polygon(center_lat, center_lon, width=0.001, height=0.001):
    """Create a rectangular polygon around a center point"""
    half_w = width / 2
    half_h = height / 2
    
    return [[
        [center_lon - half_w, center_lat - half_h],  # SW
        [center_lon + half_w, center_lat - half_h],  # SE
        [center_lon + half_w, center_lat + half_h],  # NE
        [center_lon - half_w, center_lat + half_h],  # NW
        [center_lon - half_w, center_lat - half_h]   # Close
    ]]

def create_feature(name, lat, lon, height, building_width=0.001):
    """Create a GeoJSON feature for a building"""
    return geojson.Feature(
        geometry=geojson.Polygon(
            create_building_polygon(lat, lon, building_width)
        ),
        properties={
            "name": name,
            "height": height,
            "restricted": True
        }
    )

# Example usage
geolocator = Nominatim(user_agent="skyway_drone")
location = geolocator.geocode("Tunjungan Plaza Surabaya")

if location:
    feature = create_feature(
        name="Tunjungan Plaza Surabaya",
        lat=location.latitude,
        lon=location.longitude,
        height=65
    )
    print(geojson.dumps(feature, indent=2))
```

## Final Checklist untuk AI Agent

✅ Koordinat dalam format [lon, lat] (BUKAN [lat, lon])
✅ Polygon tertutup (first point = last point)
✅ Minimal 4 unique points + 1 closing point
✅ Longitude range: 112.6 - 112.9
✅ Latitude range: -7.5 - -7.1
✅ Height estimasi realistis (10m - 200m)
✅ Name jelas dan deskriptif
✅ restricted: true untuk semua no-fly zones
✅ Valid JSON syntax
✅ FeatureCollection wrapper

## Example Full Request ke AI Agent

```
Create a GeoJSON file for all major shopping malls in Surabaya.

Requirements:
1. Find at least 15 major malls
2. Get exact coordinates from Google Maps
3. Create rectangular polygons (approximately 100m x 100m for each mall)
4. Estimate building heights based on number of floors (assume 3.5m per floor)
5. Output valid GeoJSON with FeatureCollection format
6. Coordinates must be in [longitude, latitude] format
7. All polygons must be closed (first point = last point)

Areas to cover:
- Surabaya Pusat (Tunjungan Plaza, TP2, TP3, etc)
- Surabaya Barat (Pakuwon, Ciputra World)
- Surabaya Timur (Galaxy Mall, Grand City)
- Surabaya Selatan (Royal Plaza, Surabaya Town Square)

Output should be ready to save as gedung.geojson
```

---

## Tips untuk AI Agent

1. **Batch Processing**: Process lokasi dalam batch 5-10 untuk efisiensi
2. **Error Handling**: Skip jika lokasi tidak ditemukan
3. **Validation**: Validate setiap feature sebelum add ke collection
4. **Backup**: Save intermediate results
5. **Documentation**: Include source dan timestamp dalam properties (optional)

Semoga membantu! 🚁
