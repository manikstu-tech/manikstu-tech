<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Dashboard') - Manikstu Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lucide-icons/font/lucide-regular.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');
        :root {
            --font-inter: 'Inter', sans-serif;
            --font-playfair: 'Playfair Display', serif;
            --manikstu-green: #4A8C3F;
            --manikstu-leaf: #3A7030;
            --manikstu-cream: #FDF6EC;
            --manikstu-gold: #C4952A;
            --charcoal: #1A1A1A;
            --grey: #5A5A5A;
            --light-grey: #E5E5E5;
            --manikstu-red: #D4342C;
        }
        body {
            font-family: var(--font-inter);
            color: var(--charcoal);
        }
        h1, h2, h3, h4, h5, h6 {
            font-family: var(--font-playfair);
        }
        .bg-manikstu-cream { background-color: var(--manikstu-cream); }
        .bg-manikstu-leaf { background-color: var(--manikstu-leaf); }
        .bg-manikstu-green { background-color: var(--manikstu-green); }
        .hover\:bg-manikstu-green\/30:hover { background-color: rgba(74, 140, 63, 0.3); }
        .hover\:text-manikstu-green:hover { color: var(--manikstu-green); }
        .text-charcoal { color: var(--charcoal); }
        .text-grey { color: var(--grey); }
        .text-manikstu-green { color: var(--manikstu-green); }
        .text-manikstu-gold { color: var(--manikstu-gold); }
        .text-white { color: #fff; }
        .bg-manikstu-gold { background-color: var(--manikstu-gold); }
        .border-light-grey { border-color: var(--light-grey); }
        .border-white\/20 { border-color: rgba(255,255,255,0.2); }
        .hover\:bg-manikstu-leaf:hover { background-color: var(--manikstu-leaf); }
        .hover\:text-manikstu-red:hover { color: var(--manikstu-red); }
        .hover\:shadow-md:hover { box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .transition-colors { transition: background-color 200ms, color 200ms; }
        .transition-shadow { transition: box-shadow 200ms; }
        .rounded-full { border-radius: 9999px; }
        .rounded-xl { border-radius: 0.75rem; }
        .rounded-lg { border-radius: 0.5rem; }
        .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05); }
        .shadow-md { box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
    </style>
</head>
<body>
    <div class="flex min-h-screen">
        
        <!-- Sidebar -->
        <aside class="w-64 bg-manikstu-leaf h-screen fixed left-0 top-0 flex flex-col z-30">
            
            <!-- Logo -->
            <div class="px-4 py-6 border-b border-white/20">
                <a href="{{ route('admin.dashboard') }}" class="flex items-center">
                    <img src="{{ asset('logo.png') }}" alt="Manikstu Agro" class="h-8 w-auto" />
                </a>
            </div>
            
            <!-- Navigation -->
            <nav class="flex-1 overflow-y-auto py-4 px-2 space-y-1">
                <a href="{{ route('admin.dashboard') }}" class="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm text-white/80 hover:bg-manikstu-green/30 transition-colors">
                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    Dashboard
                </a>
                
                <p class="text-xs font-semibold uppercase tracking-wider text-white/50 px-6 mt-4 mb-2">Products</p>
                <a href="#" class="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm text-white/80 hover:bg-manikstu-green/30 transition-colors">
                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    Products
                </a>
                <a href="#" class="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm text-white/80 hover:bg-manikstu-green/30 transition-colors">
                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h7v7H3z"/><path d="M14 3h7v7h-7z"/><path d="M14 14h7v7h-7z"/><path d="M3 14h7v7H3z"/></svg>
                    Categories
                </a>
                
                <p class="text-xs font-semibold uppercase tracking-wider text-white/50 px-6 mt-4 mb-2">Sales</p>
                <a href="#" class="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm text-white/80 hover:bg-manikstu-green/30 transition-colors">
                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                    Orders
                </a>
                <a href="#" class="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm text-white/80 hover:bg-manikstu-green/30 transition-colors">
                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    Customers
                </a>
                <a href="#" class="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm text-white/80 hover:bg-manikstu-green/30 transition-colors">
                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    Enquiries
                </a>
                
                <p class="text-xs font-semibold uppercase tracking-wider text-white/50 px-6 mt-4 mb-2">Content</p>
                <a href="#" class="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm text-white/80 hover:bg-manikstu-green/30 transition-colors">
                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    Blog Posts
                </a>
                <a href="#" class="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm text-white/80 hover:bg-manikstu-green/30 transition-colors">
                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>
                    Press Releases
                </a>
                <a href="#" class="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm text-white/80 hover:bg-manikstu-green/30 transition-colors">
                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                    Gallery
                </a>
                <a href="#" class="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm text-white/80 hover:bg-manikstu-green/30 transition-colors">
                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    Team
                </a>
                <a href="#" class="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm text-white/80 hover:bg-manikstu-green/30 transition-colors">
                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    Testimonials
                </a>
                
                <p class="text-xs font-semibold uppercase tracking-wider text-white/50 px-6 mt-4 mb-2">System</p>
                <a href="#" class="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm text-white/80 hover:bg-manikstu-green/30 transition-colors">
                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                    Settings
                </a>
                <a href="#" class="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm text-white/80 hover:bg-manikstu-green/30 transition-colors">
                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    Users
                </a>
            </nav>
            
            <!-- User section -->
            <div class="border-t border-white/20 p-4">
                <div class="flex items-center gap-3 mb-3">
                    <div class="h-10 w-10 rounded-full bg-manikstu-green flex items-center justify-center text-white font-semibold text-sm">
                        {{ substr(Auth::user()->name, 0, 1) }}
                    </div>
                    <div>
                        <p class="text-sm font-medium text-white">{{ Auth::user()->name }}</p>
                        <span class="text-xs bg-manikstu-gold text-white px-2 py-0.5 rounded-full">Developer</span>
                    </div>
                </div>
                <form method="POST" action="{{ route('admin.logout') }}">
                    @csrf
                    <button type="submit" class="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mt-2">
                        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                        Logout
                    </button>
                </form>
            </div>
        </aside>
        
        <!-- Main content -->
        <div class="flex-1 ml-64">
            
            <!-- Topbar -->
            <header class="h-16 bg-white border-b border-light-grey shadow-sm flex items-center justify-between px-6">
                <div class="relative">
                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-grey" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    <input type="text" placeholder="Search..." class="rounded-full border border-light-grey pl-9 pr-4 py-2 text-sm w-64 focus:border-manikstu-green focus:outline-none focus:ring-2 focus:ring-manikstu-green/20" />
                </div>
                
                <div class="flex items-center gap-4">
                    <button class="relative p-2 rounded-full hover:bg-manikstu-cream transition-colors">
                        <svg class="h-5 w-5 text-grey" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                        <span class="absolute -top-1 -right-1 h-5 w-5 bg-manikstu-red text-white text-xs rounded-full flex items-center justify-center">3</span>
                    </button>
                    
                    <div class="flex items-center gap-2">
                        <div class="h-8 w-8 rounded-full bg-manikstu-green/10 flex items-center justify-center text-manikstu-green font-semibold text-sm">
                            {{ substr(Auth::user()->name, 0, 1) }}
                        </div>
                        <span class="text-sm font-medium text-charcoal">{{ Auth::user()->name }}</span>
                        <svg class="h-4 w-4 text-grey" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                </div>
            </header>
            
            <!-- Page content -->
            <main class="p-6">
                @yield('content')
            </main>
        </div>
    </div>
</body>
</html>