<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Http\Authentication\UserAuthenticatorInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Http\Authenticator\FormLoginAuthenticator;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class AuthController extends AbstractController
{
    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
    
        if (!$data || !isset($data['email']) || !isset($data['username']) || !isset($data['password'])) {
            return $this->json(['error' => 'Invalid data. Email, username, and password are required.'], 400);
        }
    
        $existingUser = $entityManager->getRepository(User::class)->findOneBy(['email' => $data['email']]);
        $existingUsername = $entityManager->getRepository(User::class)->findOneBy(['username' => $data['username']]);
    
        if ($existingUser) {
            return $this->json(['error' => 'Email is already registered.'], 400);
        }
    
        if ($existingUsername) {
            return $this->json(['error' => 'Username is already taken.'], 400);
        }
    
        $user = new User();
        $user->setEmail($data['email']);
        $user->setUsername($data['username']);
        $user->setPassword($passwordHasher->hashPassword($user, $data['password']));
    
        $entityManager->persist($user);
        $entityManager->flush();
    
        return $this->json(['message' => 'User registered successfully!']);
    }    

    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher, JWTTokenManagerInterface $JWTManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
    
        if (!$data || !isset($data['email']) || !isset($data['password'])) {
            return $this->json(['error' => 'Invalid data. Email and password are required.'], 400);
        }
    
        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $data['email']]);
    
        if (!$user) {
            return $this->json(['error' => 'Invalid email or password.'], 401);
        }
    
        if (!$passwordHasher->isPasswordValid($user, $data['password'])) {
            return $this->json(['error' => 'Invalid email or password.'], 401);
        }
    
        $token = $JWTManager->create($user);
    
        return $this->json([
            'token' => $token,
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'username' => $user->getUsername()
            ]
        ]);
    }    
}
