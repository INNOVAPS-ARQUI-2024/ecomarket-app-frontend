import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-usuario',
  templateUrl: './home-usuario.component.html',
  styleUrls: ['./home-usuario.component.css']
})
export class HomeUsuarioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  vendedores = [
    { nombre: 'Blanca Rosa', imagen: 'ruta-vendedor1.jpg' },
    { nombre: 'John PO', imagen: 'ruta-vendedor2.jpg' },
    { nombre: 'Fabian Fabrizio', imagen: 'ruta-vendedor3.jpg' },
    { nombre: 'Juanpis', imagen: 'ruta-vendedor4.jpg' },
    { nombre: 'Jhon Abraham', imagen: 'ruta-vendedor5.jpg' },
    { nombre: 'Julia & Romina', imagen: 'ruta-vendedor6.jpg' }
  ];

  categories = [
    { name: 'Phone', icon: 'assets/phone-icon.png' },
    { name: 'Computers', icon: 'assets/computer-icon.png' },
    { name: 'SmartWatch', icon: 'assets/smartwatch-icon.png' },
    { name: 'Tecnología', icon: 'assets/technology-icon.png' },
    { name: 'HeadPhones', icon: 'assets/headphones-icon.png' },
    { name: 'Gaming', icon: 'assets/gaming-icon.png' }
  ];

  // Array de productos más vendidos
  productosMasVendidos = [
    {
      image: 'assets/havic-gamepad.png',
      name: 'Havic HV G-92 Gamepad',
      price: 260,
      oldPrice: 300,
      stars: 5,
      reviews: 65
    },
    {
      image: 'assets/gucci-bag.png',
      name: 'Gucci Duffled Bag',
      price: 960,
      oldPrice: 1160,
      stars: 4.5,
      reviews: 65
    },
    {
      image: 'assets/rgb-cooler.png',
      name: 'RGB Liquid CPU Cooler',
      price: 160,
      oldPrice: 170,
      stars: 4.5,
      reviews: 65
    },
    {
      image: 'assets/small-bookshelf.png',
      name: 'Small Bookshelf',
      price: 360,
      stars: 5,
      reviews: 65
    }
  ];

  moreProducts = [
    {
      imageUrl: 'assets/breed-dog-food.jpg',
      name: 'Breed Dry Dog Food',
      price: 100,
      starsArray: [true, true, true, false, false],
      reviews: 3,
      colors: null
    },
    {
      imageUrl: 'assets/canon-camera.jpg',
      name: 'CANON EOS DSLR Camera',
      price: 360,
      starsArray: [true, true, true, true, false],
      reviews: 95,
      colors: null
    },
    {
      imageUrl: 'assets/asus-laptop.jpg',
      name: 'ASUS FHD Gaming Laptop',
      price: 700,
      starsArray: [true, true, true, true, true],
      reviews: 325,
      colors: null
    },
    {
      imageUrl: 'assets/curology-set.jpg',
      name: 'Curology Product Set',
      price: 500,
      starsArray: [true, true, true, true, false],
      reviews: 145,
      colors: null
    },
    {
      imageUrl: 'assets/kids-electric-car.jpg',
      name: 'Kids Electric Car',
      price: 960,
      starsArray: [true, true, true, true, true],
      reviews: 65,
      colors: ['#ff0000', '#ffa500'] // rojo y naranja
    },
    {
      imageUrl: 'assets/jr-zoom-cleats.jpg',
      name: 'Jr. Zoom Soccer Cleats',
      price: 1160,
      starsArray: [true, true, true, true, true],
      reviews: 35,
      colors: ['#ffff00', '#ff0000'] // amarillo y rojo
    },
    {
      imageUrl: 'assets/gp11-gamepad.jpg',
      name: 'GP11 Shooter USB Gamepad',
      price: 660,
      starsArray: [true, true, true, true, false],
      reviews: 55,
      colors: ['#000000', '#ff0000'] // negro y rojo
    },
    {
      imageUrl: 'assets/quilted-jacket.jpg',
      name: 'Quilted Satin Jacket',
      price: 660,
      starsArray: [true, true, true, true, false],
      reviews: 55,
      colors: ['#003300', '#ff0000'] // verde oscuro y rojo
    }
  ];

  changeColor(product: { name: any; }, color: any) {
    // Lógica para cambiar la imagen dependiendo del color seleccionado
    console.log(`Cambiando el color del producto ${product.name} a ${color}`);
    // Aquí puedes agregar la lógica para cambiar la imagen si es necesario
  }

  newProducts = [
    {
      backgroundImageUrl: 'assets/playstation5.jpg',
      name: 'Play Station 5',
      description: 'Black and white version of the PS5 coming out on sale'
    },
    {
      backgroundImageUrl: 'assets/womens-collection.jpg',
      name: 'Women’s Collection',
      description: 'Women featured collection that gives you another vibe'
    },
    {
      backgroundImageUrl: 'assets/amazon-speakers.jpg',
      name: 'Speakers',
      description: 'Amazon speakers collection'
    },
    {
      backgroundImageUrl: 'assets/perfume.jpg',
      name: 'Perfume',
      description: 'Gucci Intense OUD PEF'
    }
  ];

  serviceFeatures = [
    {
      title: 'FREE AND FAST DELIVERY',
      content: 'Free delivery for all orders over $140',
      icon: 'assets/delivery-icon.png'
    },
    {
      title: '24/7 CUSTOMER SERVICE',
      content: 'Friendly 24/7 customer support',
      icon: 'assets/customer-service-icon.png'
    },
    {
      title: 'MONEY BACK GUARANTEE',
      content: 'We return money within 30 days',
      icon: 'assets/money-back-icon.png'
    }
  ];

}
