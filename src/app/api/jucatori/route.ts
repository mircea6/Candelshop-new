    import { NextResponse } from 'next/server';
    import connectDB from '@/lib/mongodb';
    import JucatorModel from '@/models/Jucator';

    // POST = când trimiti date (salvare)
    export async function POST(request: Request) {
    try {
        // 1. Conectează-te la MongoDB
        await connectDB();

        // 2. Citește datele din request (din formular)
        const body = await request.json();
        const { numeJucator, echipa, accidentat, varsta } = body;

        // 3. Validează că toate câmpurile sunt prezente
        if (!numeJucator || !echipa || varsta === undefined) {
        return NextResponse.json(
            { error: 'Toate câmpurile sunt obligatorii' },
            { status: 400 }
        );
        }

        // 4. Creează jucătorul în MongoDB
        const newJucator = await JucatorModel.create({
        numeJucator,
        echipa,
        accidentat: accidentat !== undefined ? accidentat : false,
        varsta: Number(varsta), // Asigură-te că e număr
        createdAt: new Date().toISOString(),
        });

        // 5. Formatează răspunsul (convertește _id în id)
        const formattedJucator = {
        id: newJucator._id.toString(),
        numeJucator: newJucator.numeJucator,
        echipa: newJucator.echipa,
        accidentat: newJucator.accidentat,
        varsta: newJucator.varsta,
        createdAt: newJucator.createdAt,
        };

        // 6. Returnează răspunsul cu succes
        return NextResponse.json(formattedJucator, { status: 201 });
    } catch (error) {
        console.error('Error creating jucator:', error);
        return NextResponse.json(
        { error: 'Failed to create jucator' },
        { status: 500 }
        );
    }
    }