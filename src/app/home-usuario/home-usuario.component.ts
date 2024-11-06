import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { ProductoService } from '../services/ProductoService';

@Component({
  selector: 'app-home-usuario',
  templateUrl: './home-usuario.component.html',
  styleUrls: ['./home-usuario.component.css']
})
export class HomeUsuarioComponent implements OnInit {

  isVendedor: boolean = false; // Controlamos si el usuario es vendedor
  userId: string | null = null;
  selectedCategory: any = null;

  // Declare the boolean flags for each vendor type
  showProducto: boolean = false;
  showServicio: boolean = false;
  showEvento: boolean = false;
  showPublicidad: boolean = false; // For "Organización"

  productosMasVendidos = [
    {
      image: './assets/images/Control.png',
      name: 'Havic HV G-92 Gamepad',
      price: 260,
      oldPrice: 300,
      stars: 5,
      reviews: 65
    },
    {
      image: './assets/images/BolsoGucci.png',
      name: 'Gucci Duffled Bag',
      price: 960,
      oldPrice: 1160,
      stars: 4.5,
      reviews: 65
    },
    {
      image: './assets/images/RGBcooler.png',
      name: 'RGB Liquid CPU Cooler',
      price: 160,
      oldPrice: 170,
      stars: 4.5,
      reviews: 65
    },
    {
      image: './assets/images/Bookshelf.png',
      name: 'Small Bookshelf',
      price: 360,
      stars: 5,
      reviews: 65
    }
  ];

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase, // Para acceder a Firebase Realtime Database
    private router: Router,
    private productoService: ProductoService
  ) {}

  selectedVendor: string = ''; // Initialize with an empty string or a default value

  ngOnInit(): void {
    // Verifica si el usuario está autenticado
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;

        // Accede a los detalles del usuario en la base de datos
        this.db.object(`/users/${this.userId}`).valueChanges().subscribe((userDetails: any) => {
          if (userDetails && userDetails.role === 'Vendedor') {
            this.isVendedor = true; // El usuario es un vendedor

            // Verificar la lista de tipos de vendedor y configurar las banderas
            const tiposVendedor = userDetails.tiposVendedor || [];
            this.showProducto = tiposVendedor.includes('producto');
            this.showServicio = tiposVendedor.includes('servicio');
            this.showEvento = tiposVendedor.includes('evento');
            this.showPublicidad = tiposVendedor.includes('publicidad'); // For "Organización"
          } else {
            this.isVendedor = false; // El usuario no es vendedor
          }
        });
      } else {
        this.router.navigate(['/login']); // Redirige al login si no está autenticado
      }
    });
  }

  cargarProductosMasVendidos(): void {
    this.productoService.getProductosMasVendidos().subscribe(
      (data: any[]) => {
        this.productosMasVendidos = data;
      },
      (error) => {
        console.error('Error al cargar productos más vendidos', error);
      }
    );
  }

  registrarse(): void {
    this.router.navigate(['/eventos-disponibles']);
  }

  // verEventosRegistrados(): void {
  //   this.router.navigate(['/mis-eventos']);
  // }

  irProgramarPublicacion() {
    // Navegar hacia el componente de programación de publicaciones
    this.router.navigate(['/admin-publicaciones']);
  }

  // Other logic and methods remain the same
  vendedores = [
    { nombre: 'Blanca Rosa', imagen: './assets/images/BlancaRosa.png' },
    { nombre: 'John PO', imagen: './assets/images/JohnPo.png' },
    { nombre: 'Fabian Fabrizio', imagen: './assets/images/FabianFabrizio.png' },
    { nombre: 'Juanpis', imagen: './assets/images/Juampis.png' },
    { nombre: 'Jhon Abraham', imagen: './assets/images/JohnAbraham.png' },
    { nombre: 'Julia & Romina', imagen: './assets/images/Juli&Romina.png' }
  ];

  categories = [
    { name: 'Phone', icon: './assets/images/Telefonos.png' },
    { name: 'Computers', icon: './assets/images/Computadores.png' },
    { name: 'SmartWatch', icon: './assets/images/Smartwatch.png' },
    { name: 'Tecnología', icon: './assets/images/Tecnologia.png' },
    { name: 'HeadPhones', icon: './assets/images/Audifonos.png' },
    { name: 'Gaming', icon: './assets/images/Gaming.png' }
  ];



  moreProducts = [
    {
      imageUrl: './assets/images/ComidaPerro.png',
      name: 'Breed Dry Dog Food',
      price: 100,
      starsArray: [true, true, true, false, false],
      reviews: 3,
      colors: null
    },
    {
      imageUrl: './assets/images/Camara.png',
      name: 'CANON EOS DSLR Camera',
      price: 360,
      starsArray: [true, true, true, true, false],
      reviews: 95,
      colors: null
    },
    {
      imageUrl: './assets/images/Portatil.png',
      name: 'ASUS FHD Gaming Laptop',
      price: 700,
      starsArray: [true, true, true, true, true],
      reviews: 325,
      colors: null
    },
    {
      imageUrl: './assets/images/Curologia.png',
      name: 'Curology Product Set',
      price: 500,
      starsArray: [true, true, true, true, false],
      reviews: 145,
      colors: null
    },
    {
      imageUrl: './assets/images/Carrito.png',
      name: 'Kids Electric Car',
      price: 960,
      starsArray: [true, true, true, true, true],
      reviews: 65,
      colors: ['#ff0000', '#ffa500'] // rojo y naranja
    },
    {
      imageUrl: './assets/images/Zapatos.png',
      name: 'Jr. Zoom Soccer Cleats',
      price: 1160,
      starsArray: [true, true, true, true, true],
      reviews: 35,
      colors: ['#ffff00', '#ff0000'] // amarillo y rojo
    },
    {
      imageUrl: './assets/images/Control2.png',
      name: 'GP11 Shooter USB Gamepad',
      price: 660,
      starsArray: [true, true, true, true, false],
      reviews: 55,
      colors: ['#000000', '#ff0000'] // negro y rojo
    },
    {
      imageUrl: './assets/images/Chaqueta.png',
      name: 'Quilted Satin Jacket',
      price: 660,
      starsArray: [true, true, true, true, false],
      reviews: 55,
      colors: ['#003300', '#ff0000'] // verde oscuro y rojo
    }
  ];

  calculateStars(starsArray: boolean[]): number {
    return starsArray.filter(star => star).length; // Cuenta cuántas estrellas son verdaderas
  }

  changeColor(product: { name: any; }, color: any) {
    console.log(`Cambiando el color del producto ${product.name} a ${color}`);
  }

  newProducts = [
    {
      backgroundImageUrl: './assets/images/Ps5.png',
      name: 'Play Station 5',
      description: 'Black and white version of the PS5 coming out on sale'
    },
    {
      backgroundImageUrl: './assets/images/WomensCollection.png',
      name: 'Women’s Collection',
      description: 'Women featured collection that gives you another vibe'
    },
    {
      backgroundImageUrl: './assets/images/Speakers.png',
      name: 'Speakers',
      description: 'Amazon speakers collection'
    },
    {
      backgroundImageUrl: './assets/images/Perfume.png',
      name: 'Perfume',
      description: 'Gucci Intense OUD PEF'
    }
  ];

  serviceFeatures = [
    {
      title: 'FREE AND FAST DELIVERY',
      content: 'Free delivery for all orders over $140',
      icon: './assets/images/Delivery.png'
    },
    {
      title: '24/7 CUSTOMER SERVICE',
      content: 'Friendly 24/7 customer support',
      icon: './assets/images/CostumerService.png'
    },
    {
      title: 'MONEY BACK GUARANTEE',
      content: 'We return money within 30 days',
      icon: './assets/images/Security.png'
    }
  ];

}
