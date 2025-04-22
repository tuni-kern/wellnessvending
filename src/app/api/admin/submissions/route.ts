import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  try {
    const contactsDir = path.join(process.cwd(), 'contacts');
    const contactsFile = path.join(contactsDir, 'submissions.json');
    
    try {
      // Read the submissions file
      const data = await fs.readFile(contactsFile, 'utf8');
      const submissions = JSON.parse(data);
      
      // Sort submissions by timestamp (newest first)
      submissions.sort((a: any, b: any) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      
      return NextResponse.json({ submissions });
    } catch (error) {
      // If file doesn't exist or is empty, return empty array
      return NextResponse.json({ submissions: [] });
    }
  } catch (error) {
    console.error('Error getting submissions:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve submissions' },
      { status: 500 }
    );
  }
} 