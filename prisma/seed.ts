import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.communityAmenity.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.community.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.paymentSource.deleteMany();

  console.log('Seeding...');

  const amenity1 = {
    amenityName: 'Swimming Pool',
    reservationAllowed: 'Y',
    createdBy: '12321-123',
    createdAt: new Date(),
    updatedBy: '12321-123',
    updatedAt: new Date()
  };
  const amenity2 = {
    amenityName: 'Tennis Court',
    reservationAllowed: 'Y',
    createdBy: '12321-123',
    createdAt: new Date(),
    updatedBy: '12321-123',
    updatedAt: new Date()
  };
  const amenity3 = {
    amenityName: 'Community Center',
    reservationAllowed: 'Y',
    createdBy: '12321-123',
    createdAt: new Date(),
    updatedBy: '12321-123',
    updatedAt: new Date()
  };

  const ca1 = {
    amenity: { create: amenity1 },
    createdBy: '12321-123',
    createdAt: new Date(),
    updatedBy: '12321-123',
    updatedAt: new Date()
  };
  const ca2 = {
    amenity: { create: amenity2 },
    createdBy: '12321-123',
    createdAt: new Date(),
    updatedBy: '12321-123',
    updatedAt: new Date()
  };
  const ca3 = {
    amenity: { create: amenity3 },
    createdBy: '12321-123',
    createdAt: new Date(),
    updatedBy: '12321-123',
    updatedAt: new Date()
  };

  const community1 = await prisma.community.create({
    data: {
      name: 'ABC Community',
      addressLine1: '123 W 13th St',
      city: 'City',
      state: 'State',
      zipCode: '223903',
      createdBy: '12321-123',
      createdAt: new Date(),
      updatedBy: '12321-123',
      updatedAt: new Date(),
      amenities: {
        create: [ca1, ca2, ca3]
      }
    }
  });
  const payment1 = {
    paymentAmount: '1250',
    paymentStatus: 'Processed',
    createdBy: '12321-123',
    createdAt: new Date(),
    updatedBy: '12321-123',
    updatedAt: new Date(),
  };

  const payment2 = {
    paymentAmount: '1450',
    paymentStatus: 'Scheduled',
    createdBy: '12321-123',
    createdAt: new Date(),
    updatedBy: '12321-123',
    updatedAt: new Date(),
  };

  const paymentsource1 = {

    paymentType: 'eCheck/ACH',
    accountType: 'Checking',
    accountNumber: '323213213',
    routingNumber: '454666',
    accountHolderFirstname: 'John',
    accountHolderLastname: 'Doe',
    createdAt: new Date(),
    createdBy: '12321-123',
    updatedAt: new Date(),
    updatedBy: '12321-123',
    Payment: {
      create: [payment1]
    }
  };

  const paymentsource2 = {

    paymentType: 'Credit Card',
    accountType: 'VISA',
    accountNumber: 'XXXX-XXXX-XXXX-9900',
    routingNumber: 'NA',
    accountHolderFirstname: 'John',
    accountHolderLastname: 'Doe',
    createdAt: new Date(),
    createdBy: '12321-123',
    updatedAt: new Date(),
    updatedBy: '12321-123',
    Payment: {
      create: [payment2]
    }
  };

  const proprietor = await prisma.proprietor.create({
    data: {
      firstName: 'home',
      middleName: '',
      lastName: 'owner',
      email: 'homeowner@whao.com',
      phone: '79349396',
      userId: 'homeowner@whao.com',
      createdBy: '12321-123',
      createdAt: new Date(),
      updatedBy: '12321-123',
      updatedAt: new Date(),
      PaymentSource: {
        create: [paymentsource1, paymentsource2]
      }
    }
  });



  console.log({ community1 });
}

main()
  .then(() => console.log('Goodbye from seed.js'))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
