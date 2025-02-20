<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;

class UsernameController extends AbstractController
{
    #[Route('/api/change-username', methods: ['POST'])]
    public function changeUsername(Request $request, HubInterface $hub): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (!isset($data['username']) || strlen($data['username']) < 3) {
            return new JsonResponse(['error' => 'Invalid username'], 400);
        }

        $username = htmlspecialchars($data['username']);

        // Vytvoříme Mercure update
        $update = new Update(
            'https://example.com/user/profile', // Topic
            json_encode(['username' => $username])
        );

        // Pošleme update do Mercure Hubu
        $hub->publish($update);

        return new JsonResponse(['message' => 'Username updated', 'username' => $username]);
    }
}
